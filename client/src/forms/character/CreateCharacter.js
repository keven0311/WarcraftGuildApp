import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  createCharacter,
  getCharacterCreateStatus,
} from "../../store/slices/characterSlice";

function CreateCharacter() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [server, setServer] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [level, setLevel] = useState(0);
  const [description, setDescription] = useState("");
  const createCharacterStatus = useSelector(getCharacterCreateStatus);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await dispatch(
        createCharacter({
          name,
          server,
          characterClass,
          race,
          level,
          description,
        })
      );
    }
    console.log("status", createCharacterStatus);
    setValidated(true);
  };

  useEffect(() => {
    if (createCharacterStatus) {
      toast(createCharacterStatus);
    }
  }, [dispatch, createCharacterStatus]);
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
      <Button href="#" className="mx-3">
        Go Back
      </Button>
      <ToastContainer />
    </Form>
  );
}

export default CreateCharacter;
