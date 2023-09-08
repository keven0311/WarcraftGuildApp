import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleGuild,
  selectSingleGuild,
} from "../../store/slices/guildSlice";
import {
  fetchGuildCharacters,
  getSingleGuildCharacters,
} from "../../store/slices/characterSlice";
import useUpdateCharacterGuild from "../../hooks/useUpdateCharacterGuild";
import { selectUser } from "../../store/slices/userSlice";
import AnnouncementButton from "../../components/AnnouncementButton";

function SingleGuild() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const user = useSelector(selectUser);
  const guild = useSelector(selectSingleGuild);
  const guildCharacters = useSelector(getSingleGuildCharacters);
  //custom hook: handleUpdate function takes in server,name,guildId as parameter
  const { updated, setUpdated, handleUpdate } = useUpdateCharacterGuild();

  const handleRemoveFromGuild = async (character) => {
    await handleUpdate(character.server, character.name, { guildId: null });
    setUpdated(!updated);
  };

  useEffect(() => {
    dispatch(fetchSingleGuild(name));
    if (guild.id) {
      dispatch(fetchGuildCharacters(guild.id));
    }
  }, [dispatch, guild.id, name, updated]);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>{guild?.name}</h1>
          <h5>{guild?.region}</h5>
          <h5>{guild?.server}</h5>
          {guild.description && <h6>About: {guild?.description}</h6>}
        </Col>
        <Col>
          {guild.ownerEmail === user.email ? (
            <>
              <Button variant="secondary" href={`/guild/${guild.name}/enroll`}>
                Add character
              </Button>
              <Button variant="secondary" href={`/guild/${guild.name}/update`}>
                Edit Guild Info
              </Button>
              <AnnouncementButton guildName={guild.name} />
            </>
          ) : null}
          <Button variant="primary" href="/guild">
            Go back
          </Button>
        </Col>
      </Row>
      {guild.announcement && (
        <Row>
          <h6>{guild?.announcement}</h6>
        </Row>
      )}

      <Row className="my-3">
        <h3>Member list:</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Race</th>
              <th>Level</th>
              <th>Contact</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {guildCharacters.map((character) => (
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>{character.characterClass}</td>
                <td>{character.race}</td>
                <td>{character.level}</td>
                <td>{character.contact}</td>
                <td>{character.description}</td>
                <td>
                  <Button
                    href={`/character/${character.id}`}
                    variant="outline-primary"
                  >
                    View
                  </Button>
                  {guild.ownerEmail === user.email ? (
                    <Button
                      variant="outline-primary"
                      onClick={() => handleRemoveFromGuild(character)}
                    >
                      Remove from guild
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
    </Container>
  );
}

export default SingleGuild;
