import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import {
  fetchSingleCharacter,
  selectSingleCharacter,
  updateCharacter,
} from "../../store/slices/characterSlice";
import useCharacterForm from "../../hooks/useCharacterForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  characterClasses,
  characterRace,
  characterRegion,
} from "../../utilities/characterUtilities";

function UpdateCharacter() {
  const dispatch = useDispatch();
  const { username, character } = useParams();
  const targetCharacter = useSelector(selectSingleCharacter);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [server, setServer] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState(0);
  const [description, setDescription] = useState("");
  const { validated, handleSubmit } = useCharacterForm(
    updateCharacter({
      server: targetCharacter.server,
      name: targetCharacter.name,
      info: {
        name,
        region,
        server,
        characterClass,
        race,
        level,
        description,
      },
    })
  );

  useEffect(() => {
    dispatch(fetchSingleCharacter(character));
    if (Object.keys(targetCharacter).length > 0) {
      setName(targetCharacter.name);
      setRegion(targetCharacter.region);
      setServer(targetCharacter.server);
      setCharacterClass(targetCharacter.characterClass);
      setRace(targetCharacter.race);
      setLevel(targetCharacter.level);
      setDescription(targetCharacter.description);
    }
  }, [dispatch, character, targetCharacter.name, targetCharacter.server]);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="m-4"
    >
      <Row className="mb-3">
        <h1>Edit Character:</h1>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Region</Form.Label>
          <Form.Select
            onChange={(e) => setRegion(e.target.value)}
            value={region}
          >
            <option>Select a Region</option>
            {characterRegion.map((region, idx) => (
              <option key={idx} value={region}>
                {region}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Server</Form.Label>
          <Form.Control
            required
            value={server}
            onChange={(e) => setServer(e.target.value)}
            type="text"
            placeholder="server"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Class</Form.Label>
          <Form.Select
            onChange={(e) => setCharacterClass(e.target.value)}
            value={characterClass}
          >
            <option>Select a class</option>
            {characterClasses.map((characterClass, idx) => (
              <option key={idx} value={characterClass}>
                {characterClass}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Race</Form.Label>
          <Form.Select onChange={(e) => setRace(e.target.value)} value={race}>
            <option>Select a race</option>
            {characterRace.map((characterRace, idx) => (
              <option key={idx} value={characterRace}>
                {characterRace}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Level</Form.Label>
          <Form.Control
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            type="text"
            placeholder="level"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Update</Button>
      <Button href={`/profile/${username}`} className="mx-3">
        Go Back
      </Button>
      <ToastContainer />
    </Form>
  );
}

export default UpdateCharacter;
