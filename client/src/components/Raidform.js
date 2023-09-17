import React, { useEffect, useState } from "react";
import "../styles/raidForm.css";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGuildCharacters,
  getSingleGuildCharacters,
} from "../store/slices/characterSlice";
import { useParams } from "react-router-dom";
import RaidGroupDND from "./RaidGroupDND";

function Raidform() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const reduxCharacters = useSelector(getSingleGuildCharacters);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    dispatch(fetchGuildCharacters(id));
    if (reduxCharacters) {
      setCharacters(reduxCharacters);
    }
  }, [dispatch, id, reduxCharacters.length]);

  return (
    <div>
      <h2 className="d-flex justify-content-center">Create Raid form</h2>
      <RaidGroupDND characters={characters} />
    </div>
  );
}

export default Raidform;
