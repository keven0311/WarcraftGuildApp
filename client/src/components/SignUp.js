import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function SignUp() {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:4000/api/user",
    "signUpDiv"
  );

  useEffect(() => {
    /* global google */
    // console.log("dotenv clientid", GOOGLE_CLIENT_ID);
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });
    }
    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      them: "filled_white",
      size: "large",
      shape: "pill",
      text: "continue_with",
      //   type: "icon", //can be: standard
    });
    // google.accounts.id.prompt();
  }, [handleGoogle]);
  return (
    <>
      <nav>
        <Link to="/">Go Back</Link>
      </nav>
      <header>
        <h1>Register to continue</h1>
      </header>
      <main>
        {error && <p>{error}</p>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div id="signUpDiv" data-text="signup_with"></div>
        )}
      </main>
    </>
  );
}

export default SignUp;
