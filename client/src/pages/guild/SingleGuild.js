import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleGuild,
  selectSingleGuild,
} from "../../store/slices/guildSlice";

function SingleGuild() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const guild = useSelector(selectSingleGuild);

  useEffect(() => {
    dispatch(fetchSingleGuild(name));
  }, [dispatch]);

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>{guild?.name}</h1>
          <h5>{guild?.region}</h5>
          <h5>{guild?.server}</h5>
        </Col>
        <Col>
          <Button variant="primary" href="/guild">
            Go back
          </Button>
        </Col>
      </Row>
      <Row className="my-3">
        <h3>Member list:</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Class</th>
              <th>Race</th>
              <th>Level</th>
              <th>Contact</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>member one</td>
              <td>Mage</td>
              <td>Orc</td>
              <td>70</td>
              <td>memberone@gmail.com</td>
              <td>test member here</td>
              <td>
                <Button href="#" variant="outline-primary">
                  view
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Row>
    </Container>
  );
}

export default SingleGuild;
