import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCharacter,
  getCharacterDeleteStatus,
  getUserCharacters,
  selectUserCharacters,
  updateCharacter,
} from "../store/slices/characterSlice";
import { getUserInfo, selectUser } from "../store/slices/userSlice";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchAllGuilds, selectAllGuilds } from "../store/slices/guildSlice";

function Profile() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const user = useSelector(selectUser);
  const userCharacters = useSelector(selectUserCharacters);
  const deleteStatus = useSelector(getCharacterDeleteStatus);
  const allGuild = useSelector(selectAllGuilds);
  const [isUpdated, setIsUpdated] = useState(false);

  console.log(user);

  const handleDeleteCharacter = async (server, name) => {
    await dispatch(
      deleteCharacter({
        server: server,
        name: name,
      })
    );
  };

  const handleLeaveGuild = (server, name) => {
    dispatch(
      updateCharacter({
        server,
        name,
        info: {
          guildId: null,
        },
      })
    );
    setIsUpdated(!isUpdated);
  };

  const getTargetGuildName = (guildId) => {
    const target = allGuild?.filter((guild) => guild.id === guildId);
    if (target.length > 0) {
      return target[0].name;
    } else {
      return " ";
    }
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(getUserInfo(name));
      if (user.id) {
        dispatch(getUserCharacters(user.id));
        dispatch(fetchAllGuilds());
      }
    }
  }, [dispatch, name, user.id, isUpdated]);

  useEffect(() => {
    if (deleteStatus) {
      toast.success(deleteStatus);
    }
    if (user.id) {
      dispatch(getUserCharacters(user.id));
    }
  }, [dispatch, deleteStatus]);

  return (
    <Container>
      <Row>
        <Col>
          {Object.keys(user).length > 0 ? (
            <img src={user?.picture} alt="userPic" />
          ) : null}
        </Col>
      </Row>
      <Col>{user?.name}</Col>
      <Col>{user?.email}</Col>
      <Row>Your characters:</Row>
      <Row>
        <table>
          <thead>
            <tr>
              <th>Character Name</th>
              <th>server</th>
              <th>Class</th>
              <th>Race</th>
              <th>Level</th>
              <th>Guild</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(userCharacters) && userCharacters.length > 0 ? (
              userCharacters?.map((character) => (
                <tr key={character.id}>
                  <td>{character.name}</td>
                  <td>{character.server}</td>
                  <td>{character.characterClass}</td>
                  <td>{character.race}</td>
                  <td>{character.level}</td>
                  <td>
                    {character.guildId
                      ? getTargetGuildName(character.guildId)
                      : " "}
                  </td>
                  <td>{character.description}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      href={`/profile/${user.name}/${character.name}`}
                    >
                      Edit
                    </Button>
                    {character.guildId ? (
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          handleLeaveGuild(character.server, character.name)
                        }
                      >
                        Leave Guild
                      </Button>
                    ) : (
                      <Button disabled variant="outline-secondary">
                        Leave Guild
                      </Button>
                    )}

                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        handleDeleteCharacter(character.server, character.name)
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>No Character...</td>
              </tr>
            )}
          </tbody>
        </table>
      </Row>
      <Row>
        <Button
          variant="outline-primary"
          href="/character/create"
          className="w-50 my-4"
        >
          add Character
        </Button>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Profile;
