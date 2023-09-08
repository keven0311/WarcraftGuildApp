import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createGuild,
  getGuildCreateStatus,
  resetCreateStatus,
} from "../../store/slices/guildSlice";
import { ToastContainer, toast } from "react-toastify";

function CreateGuild() {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const createStatus = useSelector(getGuildCreateStatus);

  const [info, setInfo] = useState({
    name: "",
    region: "",
    server: "",
    description: "",
    ownerEmail: "",
  });

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await dispatch(createGuild(info));
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
            name="region"
            defaultValue="defaultOptionValue"
            onChange={handleChange}
          >
            <option value="defaultOptionValue" disabled hidden>
              Select a region
            </option>
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
            name="server"
            onChange={handleChange}
            type="text"
            placeholder="server"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <textarea
            className="form-control"
            rows={3}
            name="description"
            onChange={handleChange}
            type="text"
            placeholder="description"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Owner Email</Form.Label>
          <Form.Control
            required
            name="ownerEmail"
            onChange={handleChange}
            type="text"
            placeholder="Guild Owner Email"
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
