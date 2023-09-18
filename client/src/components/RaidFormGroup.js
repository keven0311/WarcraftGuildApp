import React, { useEffect, useState } from "react";
import RaidFormGroupCharacter from "./RaidFormGroupCharacter";
import { useDispatch } from "react-redux";
import { fetchSingleCharacterById } from "../store/slices/characterSlice";

function RaidFormGroup({ group }) {
  const dispatch = useDispatch();
  const [loadCharacters, setLoadCharacters] = useState([]);

  //   console.log(loadCharacters);

  useEffect(() => {
    if (group.length > 0) {
      const characterToLoad = [];
      Promise.all(
        group.map((characterId) => {
          return dispatch(fetchSingleCharacterById(characterId))
            .then((res) => {
              characterToLoad.push(res.payload);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
      ).then(() => {
        setLoadCharacters(characterToLoad);
      });
    }
  }, [dispatch, group]);

  return (
    <div>
      {loadCharacters.length > 0 ? (
        loadCharacters.map((character, idx) => (
          <RaidFormGroupCharacter key={idx} character={character} />
        ))
      ) : (
        <div>No characters loaded</div>
      )}
    </div>
  );
}

export default RaidFormGroup;
