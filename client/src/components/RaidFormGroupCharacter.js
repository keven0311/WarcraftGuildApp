import React from "react";
import { characterClassCSS } from "../utilities/characterUtilities";

function RaidFormGroupCharacter({ character }) {
  //   console.log("character recieved from RadiFormGroupCharacter:", character);
  return (
    <div
      className={`character ${characterClassCSS(character?.characterClass)}`}
    >
      {character?.name}
    </div>
  );
}

export default RaidFormGroupCharacter;
