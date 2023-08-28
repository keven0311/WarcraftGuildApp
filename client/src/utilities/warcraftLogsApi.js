import axios from "axios";

const API_KEY = process.env.REACT_APP_WARCRAFTLOGS_CLIENT_ID;
const BASE_URL = "https://www.warcraftlogs.com/api/v2/client";

export const getCharacterData = async (characterName, serverName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}character/${encodeURIComponent(
        serverName
      )}/${encodeURIComponent(characterName)}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching character data:", error.message);
    throw error;
  }
};
