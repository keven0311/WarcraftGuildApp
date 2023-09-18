import { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import TopNavbar from "./components/TopNavbar";
import AllGuilds from "./pages/guild/AllGuilds";
import SingleGuild from "./pages/guild/SingleGuild";
import CreateGuild from "./forms/guild/CreateGuild";
import CreateCharacter from "./forms/character/CreateCharacter";
import Profile from "./pages/Profile";
import { useDispatch } from "react-redux";
import useFetch from "./hooks/useFetch";
import { setUser } from "./store/slices/userSlice";
import jwt_decode from "jwt-decode";
import UpdateCharacter from "./forms/character/UpdateCharacter";
import SingleCharacter from "./pages/character/SingleCharacter";
import EnrollGuild from "./forms/character/EnrollGuild";
import UpdateGuild from "./forms/guild/UpdateGuild";
import TestRaidDND from "./components/TestRaidDND";
import RaidFormCreate from "./components/RaidFormCreate";
import RaidFormView from "./pages/raidForms/RaidFormView";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const dispatch = useDispatch();
  const storedToken = sessionStorage.getItem("authToken");

  if (storedToken) {
    const userData = jwt_decode(storedToken);
    dispatch(setUser(userData));
  }

  const { handleGoogle } = useFetch(
    "http://localhost:4000/api/user",
    "logInDiv"
  );

  useEffect(() => {
    try {
      /* global google */

      if (window.google) {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogle,
        });
        google.accounts.id.renderButton(document.getElementById("logInDiv"), {
          theme: "filled_white",
          size: "large",
          text: "signin_with",
          shape: "pill",
          type: "icon",
        });
      }

      // google.accounts.id.prompt();
    } catch (err) {
      console.log(err);
    }
  }, [handleGoogle]);

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
        <Route path="/guild/:name/update" element={<UpdateGuild />} />
        <Route path="/character/create" element={<CreateCharacter />} />
        <Route path="/profile/:name" element={<Profile />} />
        <Route
          path="/profile/:username/:character"
          element={<UpdateCharacter />}
        />
        <Route path="/character/:id" element={<SingleCharacter />} />
        <Route path="/guild/:name/enroll" element={<EnrollGuild />} />
        <Route path="/guild/:id/raidform/create" element={<RaidFormCreate />} />
        <Route path="/test" element={<TestRaidDND />} />
        <Route path="/guild/:name/raidform" element={<RaidFormView />} />
      </Routes>
    </div>
  );
}

export default App;
