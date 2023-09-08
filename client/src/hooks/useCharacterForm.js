import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCharacterCreateStatus,
  getCharacterUpdateStatus,
} from "../store/slices/characterSlice";

export const useCharacterForm = (reduxThunk) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(false);
  const createCharacterStatus = useSelector(getCharacterCreateStatus);
  const updateStatus = useSelector(getCharacterUpdateStatus);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      await dispatch(reduxThunk);
    }
    setValidated(true);
  };

  useEffect(() => {
    if (createCharacterStatus) {
      if (createCharacterStatus === "Request failed with status code 400") {
        toast.error("Oops! Character already exsist!!!");
      }
      if (createCharacterStatus === "Character created!") {
        toast.success(createCharacterStatus);
      }
    }
    if (updateStatus) {
      if (updateStatus === "Request failed with status code 500") {
        toast.error("Oops! Something wrong...");
      }
      if (updateStatus === "Character updated!") {
        toast.success(updateStatus);
      }
    }
  }, [dispatch, createCharacterStatus, updateStatus]);

  return { validated, handleSubmit };
};

export default useCharacterForm;
