import { useState } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";
import { setUser, createUser } from "../store/slices/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useFetch = (url, targetDiv) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogle = async (res) => {
    // console.log(res);
    const userData = jwt_decode(res.credential);
    const newUser = { name: userData.name, email: userData.email };
    dispatch(createUser(newUser));
    document.getElementById(targetDiv).hidden = true;
    navigate("/");
  };

  return { loading, error, handleGoogle };
};

export default useFetch;
