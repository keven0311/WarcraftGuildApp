import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function LogIn() {
  const { handleGoogle, loading, error } = useFetch(
    "http://localhost:4000/api/user",
    "logInDiv"
  );

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });
    }

    google.accounts.id.renderButton(document.getElementById("logInDiv"), {
      theme: "filled_white",
      size: "large",
      text: "signin_with",
      shape: "pill",
      // type:'standard',
    });

    google.accounts.id.prompt();
  }, [handleGoogle]);
  return (
    <div>
      <nav>
        <Link to="/">Go Back</Link>
      </nav>
      <header>
        <h1>Login to continue</h1>
      </header>
      <main>
        {error && <p>{error}</p>}
        {loading ? <div>Loading...</div> : <div id="logInDiv"></div>}
      </main>
    </div>
  );
}

export default LogIn;
