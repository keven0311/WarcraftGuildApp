import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserCharacters,
  selectUserCharacters,
} from "../store/slices/characterSlice";
import { getUserInfo, selectUser } from "../store/slices/userSlice";
import { useParams } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const user = useSelector(selectUser);
  const userCharacters = useSelector(selectUserCharacters);

  useEffect(() => {
    if (user) {
      dispatch(getUserCharacters(user.id));
      dispatch(getUserInfo(name));
    }
  }, [dispatch, name, user.id]);
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
                  <td>{character.description}</td>
                  <td>
                    <Button variant="outline-primary" href="#">
                      Edit
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
        <Button variant="outline-primary" href="#">
          add Character
        </Button>
        <Button variant="outline-primary" className="w-50">
          Edit
        </Button>
      </Row>
    </Container>
  );
}

export default Profile;
