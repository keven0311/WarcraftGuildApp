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
      toast(createCharacterStatus);
    }
    if (updateStatus) {
      toast(updateStatus);
    }
  }, [dispatch, createCharacterStatus, updateStatus]);

  return { validated, handleSubmit };
};

export default useCharacterForm;
