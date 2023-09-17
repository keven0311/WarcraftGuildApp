import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postRaidForm } from "../store/slices/raidFormSlice";

function RaidFormSubmit({ info }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log("info from RaidFormSubmit:", info);
    dispatch(postRaidForm(info));
  };
  return (
    <div>
      <Button
        variant="primary"
        onClick={() => {
          handleClick();
        }}
      >
        Create form
      </Button>
    </div>
  );
}

export default RaidFormSubmit;
