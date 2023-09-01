import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Warcraftlog from "./pages/Warcraftlog";
import TopNavbar from "./components/TopNavbar";
import GuildMembers from "./pages/guild/GuildMembers";
import AllGuilds from "./pages/guild/AllGuilds";
import SingleGuild from "./pages/guild/SingleGuild";
import CreateGuild from "./forms/guild/CreateGuild";
import CreateCharacter from "./forms/character/CreateCharacter";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/guild" element={<AllGuilds />} />
        <Route path="/guild/:name" element={<SingleGuild />} />
        <Route path="/guild/create" element={<CreateGuild />} />
        <Route path="/character/create" element={<CreateCharacter />} />
      </Routes>
    </div>
  );
}

export default App;
