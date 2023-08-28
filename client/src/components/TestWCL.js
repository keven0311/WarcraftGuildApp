import React, { useState, useEffect } from "react";

const App = () => {
  const [raidData, setRaidData] = useState([]);
  const apiKey = process.env.REACT_APP_WARCRAFTLOGS_CLIENT_ID;
  const guildName = "Style";
  const serverName = "Illidan";
  const zoneID = 11; // Replace with the desired raid zone ID

  useEffect(() => {
    fetchRaidData();
  }, []);

  const fetchRaidData = async () => {
    try {
      const response = await fetch(
        `https://www.warcraftlogs.com/v1/reports/guild/${guildName}/${serverName}/US?zone=${zoneID}&api_key=${apiKey}`
      );

      if (response.ok) {
        const data = await response.json();
        setRaidData(data);
      } else {
        console.error("Failed to fetch raid data");
      }
    } catch (error) {
      console.error("Error fetching raid data:", error);
    }
  };

  return (
    <div>
      <h1>Raid Data</h1>
      <ul>
        {raidData.map((report) => (
          <li key={report.id}>
            <a
              href={`https://www.warcraftlogs.com/reports/${report.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {report.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
