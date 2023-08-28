import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createGuild,
  getCreateStatus,
  resetCreateStatus,
} from "../../store/slices/guildSlice";
import { ToastContainer, toast } from "react-toastify";

function CreateGuild() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [server, setServer] = useState("");
  const createStatus = useSelector(getCreateStatus);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await dispatch(createGuild({ name, region, server }));
    }
    setValidated(true);
  };

  useEffect(() => {
    if (createStatus) {
      if (createStatus === "Request failed with status code 400") {
        toast("Guild already exsist!");
      } else {
        toast(createStatus);
        dispatch(resetCreateStatus());
      }
    }
  }, [dispatch, createStatus]);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <h1>New Guild:</h1>
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
          <Form.Select onChange={(e) => setRegion(e.target.value)}>
            <option>Select a region</option>
            <option value={"US"}>US</option>
            <option value={"Asia"}>Asia</option>
            <option value={"EU"}>EU</option>
            <option value={"Korea"}>Korea</option>
            <option value={"Taiwan"}>Taiwan</option>
            <option value={"China"}>China</option>
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
      </Row>
      <Button type="submit">Submit form</Button>
      <Button href="/guild" className="mx-3">
        Go Back
      </Button>
      <ToastContainer />
    </Form>
  );
}

export default CreateGuild;
