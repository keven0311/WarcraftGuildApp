import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { createCharacter } from "../../store/slices/characterSlice";
import useCharacterForm from "../../hooks/useCharacterForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, selectUser } from "../../store/slices/userSlice";
import {
  characterClasses,
  characterRace,
  characterRegion,
} from "../../utilities/characterUtilities";

function CreateCharacter() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [info, setInfo] = useState({
    name: "",
    region: "",
    server: "",
    characterClass: "",
    race: "",
    level: 0,
    description: "",
  });

  const { validated, handleSubmit } = useCharacterForm(
    createCharacter({
      ...info,
      server: info.server.toLowerCase(),
      userId: user.id,
    })
  );

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

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
            name="name"
            onChange={handleChange}
            type="text"
            placeholder="name"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Region</Form.Label>
          <Form.Select
            required
            defaultValue="defaultOptionValue"
            name="region"
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
            onChange={handleChange}
            type="text"
            placeholder="server"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Class</Form.Label>
          <Form.Select
            required
            defaultValue="defaultOptionValue"
            name="characterClass"
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
            required
            name="race"
            defaultValue="defaultOptionValue"
            onChange={handleChange}
          >
            <option value="defaultOptionValue" hidden disabled>
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
            row={3}
            name="description"
            onChange={handleChange}
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
