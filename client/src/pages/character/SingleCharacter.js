import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleCharacterById,
  selectSingleCharacter,
} from "../../store/slices/characterSlice";
import {
  fetchSingleGuildById,
  selectSingleGuild,
} from "../../store/slices/guildSlice";

function SingleCharacter() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const character = useSelector(selectSingleCharacter);
  const characterGuild = useSelector(selectSingleGuild);

  useEffect(() => {
    dispatch(fetchSingleCharacterById(id));
    if (character.guildId) {
      dispatch(fetchSingleGuildById(character.guildId));
    }
  }, [dispatch, id, character.guildId]);

  return (
    <Container>
      {character && Object.keys(character).length > 0 ? (
        <>
          <Col className="fs-5">
            <Row className="display-4 d-flex flex-nowrap justify-content-between mb-2">
              <div className="p-0 me-auto">{character.name}</div>
              <div>
                <Button
                  className=""
                  href={`https://www.warcraftlogs.com/character/${character.region}/${character.server}/${character.name}`}
                >
                  WCL
                </Button>
              </div>
            </Row>
            <Row>Region: {character.region}</Row>
            <Row>Server: {character.server}</Row>
            <Row>Class: {character.characterClass}</Row>
            <Row>Race: {character.race}</Row>
            <Row>Level: {character.level}</Row>
            <Row>
              Guild:{" "}
              {Object.keys(characterGuild).length > 0
                ? characterGuild.name
                : "NO GUILD"}
            </Row>
            <Row>Note: {character.description}</Row>
            <Row>Contact: {character.contact}</Row>
            <Row>
              <Col className="p-0 my-3">
                <Button
                  variant="outline-primary"
                  className=""
                  onClick={() => window.history.back()}
                >
                  Go back
                </Button>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </>
      ) : (
        <p>Character not exsist...</p>
      )}
    </Container>
  );
}

export default SingleCharacter;
