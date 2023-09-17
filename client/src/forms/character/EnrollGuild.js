import React, { useEffect, useState } from "react";
import { Button, Container, Table, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  unenrolledCharacters,
  getUnenrolledCharacters,
} from "../../store/slices/characterSlice";
import useUpdateCharacterGuild from "../../hooks/useUpdateCharacterGuild";
import { useParams } from "react-router-dom";
import {
  fetchSingleGuild,
  selectSingleGuild,
} from "../../store/slices/guildSlice";

function EnrollGuild() {
  const dispatch = useDispatch();
  const { name } = useParams();
  const guild = useSelector(selectSingleGuild);
  const characters = useSelector(getUnenrolledCharacters);
  const { updated, setUpdated, handleUpdate } = useUpdateCharacterGuild();
  const [searchInput, setSearchInput] = useState("");

  //this way maybe not good when amount of unenrolled characters are too large.
  //in that situation maybe add a search button to call a function search in database.
  const searchedCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleAdd = async (character) => {
    await handleUpdate(character.server, character.name, { guildId: guild.id });
    setUpdated(!updated);
  };

  useEffect(() => {
    dispatch(fetchSingleGuild(name));
  }, [dispatch, name]);

  useEffect(() => {
    dispatch(unenrolledCharacters());
  }, [dispatch, updated]);

  return (
    <Container className="mt-4">
      <h1>{name}</h1>
      <div className="d-flex  mb-2 flex-nowrap ">
        <InputGroup className="d-flex align-content-stretch">
          <div className="input-group-prepend d-flex align-content-stretch">
            <span className="input-group-text" id="inputGroup-sizing-default">
              Search by name
            </span>
          </div>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-control"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <Button variant="primary" className="p-1" href={`/guild/${guild.name}`}>
          Go back
        </Button>
      </div>
      <Table className="table-hover">
        <caption>Unenrolled Characters</caption>
        <thead className="table-dark">
          <tr className="">
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Region</th>
            <th scope="col">Server</th>
            <th scope="col">Class</th>
            <th scope="col">Race</th>
            <th scope="col">Level</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {/* search character */}
        <tbody>
          {searchedCharacters && searchedCharacters.length > 0 ? (
            searchedCharacters.map((character) => (
              <tr key={character.id}>
                <th scope="row">{character.id}</th>
                <td>{character.name}</td>
                <td>{character.region}</td>
                <td>{character.server}</td>
                <td>{character.characterClass}</td>
                <td>{character.race}</td>
                <td>{character.level}</td>
                <td>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleAdd(character)}
                  >
                    add
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td>
                <p>No Character...</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default EnrollGuild;
