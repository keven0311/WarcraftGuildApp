import React, { useEffect, useState } from "react";
import { getCharacterData } from "../utilities/warcraftLogsApi";
import axios from "axios";

function Warcraftlog() {
  const [characterName, setCharacterName] = useState("");
  const [serverName, setServerName] = useState("");
  const [characterData, setCharacterData] = useState(null);

  const fetchCharacterData = async () => {
    try {
      const { data } = await getCharacterData(characterName, serverName);
      setCharacterData(data);
      console.log("data from fetchCharacterData:", data);
    } catch (err) {
      console.log(err);
    }
  };

  const testWCL = async () => {
    try {
      const response = await axios.get(
        "https://www.warcraftlogs.com/oauth/authorize"
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={fetchCharacterData}>
        <label>character name:</label>
        <input
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
        />
        <label>server name:</label>
        <input
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />
        <button type="submit">go</button>
      </form>
      {characterData ? (
        <h2>{characterData.name}</h2>
      ) : (
        <p>Loading character data...</p>
      )}
      <button onClick={testWCL}>test</button>
    </div>
  );
}

export default Warcraftlog;
