import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleGuild,
  getGuildUpdateStatus,
  resetUpdateStatus,
  selectSingleGuild,
  updateGuild,
} from "../../store/slices/guildSlice";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import { selectUser } from "../../store/slices/userSlice";

function UpdateGuild() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const targetGuild = useSelector(selectSingleGuild);
  const { name } = useParams();
  const [validated, setValidated] = useState(false);
  const updateStatus = useSelector(getGuildUpdateStatus);
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
      await dispatch(
        updateGuild({
          name: name,
          info: {
            ...info,
            server: info.server.toLowerCase(),
            ownerEmail: info.ownerEmail === "" ? user?.email : info.ownerEmail,
          },
        })
      );
    }
    setValidated(true);
  };

  useEffect(() => {
    dispatch(fetchSingleGuild(name));
    if (Object.keys(targetGuild).length > 0) {
      setInfo({
        ...targetGuild,
      });
      console.log("useEffect if statement log called!");
    }
  }, [dispatch, name, targetGuild.name, targetGuild.server]);

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
            defaultValue={info.server}
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
            defaultValue={info.description}
            onChange={handleChange}
            type="text"
            placeholder="description"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Owner Email</Form.Label>
          <Form.Control
            name="ownerEmail"
            defaultValue={info.ownerEmail}
            onChange={handleChange}
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
