import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getGuildUpdateStatus,
  resetUpdateStatus,
  updateGuild,
} from "../../store/slices/guildSlice";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/slices/userSlice";

function UpdateGuild() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const { name } = useParams();
  const [validated, setValidated] = useState(false);
  const [guildName, setGuildName] = useState(name);
  const [region, setRegion] = useState("");
  const [server, setServer] = useState("");
  const [description, setDescription] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const updateStatus = useSelector(getGuildUpdateStatus);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await dispatch(
        updateGuild({
          name: name,
          info: {
            name: guildName,
            region,
            server: server.toLowerCase(),
            description,
            ownerEmail: ownerEmail === "" ? user?.email : ownerEmail,
          },
        })
      );
    }
    setValidated(true);
  };

  useEffect(() => {
    if (updateStatus) {
      if (updateStatus === "Request failed with status code 500") {
        toast.error("Oops something wrong!");
      } else {
        toast.success(updateStatus);
        dispatch(resetUpdateStatus());
      }
    }
  }, [dispatch, updateStatus]);

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <h1>Edit Guild:</h1>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            value={guildName}
            onChange={(e) => setGuildName(e.target.value)}
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
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Description</Form.Label>
          <textarea
            className="form-control"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Owner Email</Form.Label>
          <Form.Control
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            type="text"
            placeholder="ownerEmail"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button type="submit">Submit form</Button>
      <Button href={`/guild/${name}`} className="mx-3">
        Go Back
      </Button>
      <ToastContainer />
    </Form>
  );
}

export default UpdateGuild;
