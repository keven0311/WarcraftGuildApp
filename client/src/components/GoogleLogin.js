import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";
import { setUser, createUser } from "../store/slices/userSlice";
import axios from "axios";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function GoogleLogin() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  function handleCallbackResponse(res) {
    // console.log("Encoded JWT ID token" + res.credential);
    const userObj = jwt_decode(res.credential);
    // console.log(userObj);
    // dispatch(setUser(userObj));
    // console.log(user);
    const newUser = { name: userObj.name, email: userObj.email };
    dispatch(createUser(newUser));
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(e) {
    dispatch(setUser({}));
    document.getElementById("signInDiv").hidden = false;
  }

  async function handleTest() {
    try {
      const { data } = await axios.post("/api/user", {
        name: "testUser",
        email: "testUser@gmail.com",
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    /* global google */

    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });
    }

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "filled_white", //can be: outline, filled_black, filled_blue
      size: "large", //can be: large,small,medium
      shape: "pill", //this can be:rectangular, circle,square, pill
      // text: "continue_with", // can be: continue_with, signin, signup_with, signin_with
      logo_alignment: "center", //can be: left
      // locale: "", //this used to set sepcific language
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <div>
      <div id="signInDiv"></div>
      {user ? (
        <div>
          <img src={user.picture} alt="" />
          <h3>{user.name}</h3>
          {Object.keys(user).length !== 0 && (
            <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
          )}
        </div>
      ) : null}
      <button onClick={handleTest}>test</button>
    </div>
  );
}

export default GoogleLogin;
