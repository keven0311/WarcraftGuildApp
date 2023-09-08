import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateGuild } from "../store/slices/guildSlice";

function AnnouncementButton({ guildName }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = async () => {
    await dispatch(
      updateGuild({
        name: guildName,
        info: {
          announcement: announcement,
        },
      })
    );
    setShowModal(false);
  };
  return (
    <>
      <Button variant="secondary" onClick={handleModal}>
        Make an announcement
      </Button>

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Announcement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="announcementTextarea">
            <Form.Label>Announcement Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AnnouncementButton;
