import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser, createUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const useFetch = (url, targetDiv) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogle = async (res) => {
    // console.log(res);
    const userData = jwt_decode(res.credential);
    console.log(userData);
    const newUser = {
      name: userData.name,
      email: userData.email,
      picture: userData.picture,
    };
    sessionStorage.setItem("authToken", res.credential);
    dispatch(createUser(newUser));
    dispatch(setUser(userData));
    // document.getElementById(targetDiv).hidden = true;
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
