import { useDispatch } from "react-redux";
import { updateCharacter } from "../store/slices/characterSlice";
import { useState } from "react";

export const useUpdateCharacterGuild = () => {
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);

  const handleUpdate = async (server, name, guildId) => {
    await dispatch(
      updateCharacter({
        server: server,
        name: name,
        info: guildId,
      })
    );
    setUpdated(!updated);
  };

  return { updated, setUpdated, handleUpdate };
};

export default useUpdateCharacterGuild;
