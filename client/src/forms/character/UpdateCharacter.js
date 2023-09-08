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
  const [info, setInfo] = useState({
    name: "",
    region: "",
    server: "",
    characterClass: "",
    race: "",
    level: 0,
    description: "",
  });

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const { validated, handleSubmit } = useCharacterForm(
    updateCharacter({
      server: targetCharacter.server,
      name: targetCharacter.name,
      info: {
        ...info,
        server: info.server.toLowerCase(),
      },
    })
  );

  useEffect(() => {
    dispatch(fetchSingleCharacter(character));
    if (Object.keys(targetCharacter).length > 0) {
      setInfo({
        ...targetCharacter,
      });
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
            name="name"
            defaultValue={info.name}
            onChange={handleChange}
            type="text"
            placeholder="name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Region</Form.Label>
          <Form.Select
            name="region"
            value={info.region || "defaultOptionValue"}
            onChange={handleChange}
          >
            <option value="defaultOptionValue" disabled hidden>
              Select a Region
            </option>

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
            name="server"
            defaultValue={info.server}
            onChange={handleChange}
            type="text"
            placeholder="server"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Class</Form.Label>
          <Form.Select
            name="characterClass"
            value={info.characterClass || "defaultOptionValue"}
            onChange={handleChange}
          >
            <option value="defaultOptionValue" disabled hidden>
              Select a class
            </option>
            {characterClasses.map((characterClass, idx) => (
              <option key={idx} value={characterClass}>
                {characterClass}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Race</Form.Label>
          <Form.Select
            name="race"
            value={info.race || "defaultOptionValue"}
            onChange={handleChange}
          >
            <option value="defaultOptionValue" disabled hidden>
              Select a race
            </option>
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
            name="level"
            defaultValue={info.level}
            onChange={handleChange}
            type="number"
            min="1"
            max="70"
            placeholder="level"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            defaultValue={info.description}
            onChange={handleChange}
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
