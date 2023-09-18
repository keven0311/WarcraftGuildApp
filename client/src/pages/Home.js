import React from "react";
import "../styles/home.css";
import ah from "../images/alliance-horde.jpg";

function Home() {
  return (
    <div className="home_container ">
      <img className="backgroundImage" src={ah} alt="backgroundimage" />
      <div className="home_left">
        <h2 className="home_left_title">World of Warcraft Guilds</h2>
        <p className="home_left_text">
          Welcome to World of Warcraft Guild app!👋 Here you can manage your
          guild easily.🎈 Add characters to your guild, make announcement to
          your guild board, creat raid group and time. 🚩Let's connect our guild
          members here and beat bosses and mythic dungeons together!🏃‍♂️
        </p>
        <div>
          <button className="home_left_button">
            <a href="/guild">Guilds</a>
          </button>
        </div>
      </div>
      <div className="home_author">
        <h4>" by Kaichong "</h4>
      </div>
    </div>
  );
}

export default Home;
