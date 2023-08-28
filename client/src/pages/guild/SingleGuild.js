import React from "react";
import { useParams } from "react-router-dom";

function SingleGuild() {
  const { name } = useParams();
  return <div>single guild</div>;
}

export default SingleGuild;
