import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGuilds, selectAllGuilds } from "../../store/slices/guildSlice";
import "../../styles/allGuilds.css";
import { Button, Container, Row } from "react-bootstrap";

function AllGuilds() {
  const dispatch = useDispatch();
  const allGuilds = useSelector(selectAllGuilds);

  useEffect(() => {
    dispatch(fetchAllGuilds());
  }, [dispatch]);

  return (
    <Container>
      {allGuilds.length > 0 ? (
        <Row>
          <table>
            <thead>
              <tr>
                <th>Guild Name</th>
                <th>Region</th>
                <th>Server</th>
                <th>Members</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allGuilds.map((guild) => (
                <tr key={guild.id}>
                  <td>{guild.name}</td>
                  <td>{guild.region}</td>
                  <td>{guild.server}</td>
                  <td>0</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      href={`/guild/${guild.name}`}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>
      ) : (
        <p>No Guild</p>
      )}
      <Row>
        <Button variant="outline-primary" href="/guild/create">
          Create Guild
        </Button>
      </Row>
    </Container>
  );
}

export default AllGuilds;
