import React from "react";
import { Button } from "react-bootstrap";

function RaidFormSubmit() {
  const handleClick = () => {};
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
