import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import { createCharacter } from "../../store/slices/characterSlice";
import useCharacterForm from "../../hooks/useCharacterForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, selectUser } from "../../store/slices/userSlice";

function CreateCharacter() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [server, setServer] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState(0);
  const [description, setDescription] = useState("");
  const { validated, handleSubmit } = useCharacterForm(
    createCharacter({
      name,
      server,
      characterClass,
      race,
      level,
      description,
      userId: user.id,
    })
  );

  const characterClasses = [
    "Death Knight",
    "Demon Hunter",
    "Druid",
    "Evoker",
    "Hunter",
    "Mage",
    "Monk",
    "Paladin",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior",
  ];

  const characterRace = [
    "Human",
    "Dwarf",
    "Night Elf",
    "Gnome",
    "Draenei",
    "Worgen",
    "Pandaren",
    "Dracthyr",
    "Orc",
    "Undead",
    "Tauren",
    "Troll",
    "Blood Elf",
    "Goblin",
  ];

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(getUserInfo(user.name));
    }
  }, [dispatch, user.name]);

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className="m-4"
    >
      <Row className="mb-3">
        <h1>New Character:</h1>
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
          <Form.Select onChange={(e) => setCharacterClass(e.target.value)}>
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
          <Form.Select onChange={(e) => setRace(e.target.value)}>
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
      <Button type="submit">Submit form</Button>
      <Button href={`/profile/${user.name}`} className="mx-3">
        Go Back
      </Button>
      <ToastContainer />
    </Form>
  );
}

export default CreateCharacter;
