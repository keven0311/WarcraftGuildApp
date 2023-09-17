import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/raidForm.css";
import RaidFormSubmit from "./RaidFormSubmit";
import { characterClassCSS } from "../utilities/characterUtilities";
import RaidFormTime from "./RaidFormTime";
import { useParams } from "react-router-dom";

function RaidGroupDND({ characters }) {
  const { id } = useParams();
  const [dndgroups, setDndGroups] = useState({
    groupOne: {
      name: "Group 1",
      characters: [],
      styles: {},
    },
    groupTwo: {
      name: "Group 2",
      characters: [],
      styles: {},
    },
    groupThree: {
      name: "Group 3",
      characters: [],
      styles: {},
    },
    groupFour: {
      name: "Group 4",
      characters: [],
      styles: {},
    },
    characterList: {
      name: "Characters",
      characters: [],
      styles: {
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-start",
        flexWrap: "wrap",
        width: "auto",
        maxWidth: "810px",
        minWidth: "810px",
        marginLeft: "80px",
        border: "1px solid grey",
        padding: 1,
        minHeight: "280px",
      },
    },
  });
  const [time, setTime] = useState(new Date());
  const [description, setDescription] = useState("");

  let info = {
    time: time,
    groupOne: dndgroups.groupOne.characters.map((character) => character.id),
    groupTwo: dndgroups.groupTwo.characters.map((character) => character.id),
    groupThree: dndgroups.groupThree.characters.map(
      (character) => character.id
    ),
    groupFour: dndgroups.groupFour.characters.map((character) => character.id),
    raidCharactersId: [
      ...dndgroups.groupOne.characters.map((character) => character.id),
      ...dndgroups.groupTwo.characters.map((character) => character.id),
      ...dndgroups.groupThree.characters.map((character) => character.id),
      ...dndgroups.groupFour.characters.map((character) => character.id),
    ],
    description: description,
    guildId: Number(id),
  };

  //   console.log(info);

  const onTimeChange = (newTime) => {
    // console.log("recieved time from child component", newTime);
    setTime(
      new Date(
        `${newTime.month} ${newTime.day},${newTime.year} ${newTime.hour}:${newTime.minutes}`
      )
    );
  };

  const onDragEnd = (result, dndgroups, setDndGroups) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceGroup = dndgroups[source.droppableId];
      const destGroup = dndgroups[destination.droppableId];
      const sourceCharacters = [...sourceGroup.characters];
      const destCharacters = [...destGroup.characters];
      const [removed] = sourceCharacters.splice(source.index, 1);
      destCharacters.splice(destination.index, 0, removed);
      setDndGroups({
        ...dndgroups,
        [source.droppableId]: {
          ...sourceGroup,
          characters: sourceCharacters,
        },
        [destination.droppableId]: {
          ...destGroup,
          characters: destCharacters,
        },
      });
    } else {
      const group = dndgroups[source.droppableId];
      const characterArray = [...group.characters];
      const [removed] = characterArray.splice(source.index, 1);
      characterArray.splice(destination.index, 0, removed);
      setDndGroups({
        ...dndgroups,
        [source.droppableId]: {
          ...group,
          characters: characterArray,
        },
      });
    }
  };

  useEffect(() => {
    setDndGroups({
      ...dndgroups,
      characterList: {
        ...dndgroups.characterList,
        characters: characters,
      },
    });
  }, [characters]);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, dndgroups, setDndGroups)}
        >
          {Object.entries(dndgroups).map(([groupName, value], index) => {
            return (
              <div
                key={groupName}
                className="d-flex flex-column align-items-center"
              >
                <h5>{value.name}</h5>
                <div>
                  <Droppable droppableId={groupName} key={groupName}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            margin: "10px",
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "#dedede",
                            padding: 3,
                            width: 110,
                            minHeight: "280px",
                            border: "1px solid grey",
                            ...value.styles,
                          }}
                        >
                          {value.characters.map((character, index) => {
                            return (
                              <Draggable
                                key={character.id}
                                draggableId={character.name}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        display: "flex",
                                        userSelect: "none",
                                        padding: 1,
                                        minHeight: "40px",
                                        width: "100px",
                                        color: "black",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      <div
                                        className={`character ${characterClassCSS(
                                          character.characterClass
                                        )}`}
                                      >
                                        {character.name}
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <RaidFormTime onTimeChange={onTimeChange} />
        <div className="d-flex flex-column w-25 mx-3">
          <label>Description:</label>
          <textarea onChange={(e) => setDescription(e.target.value)} />
        </div>
        <RaidFormSubmit info={info} />
      </div>
    </>
  );
}

export default RaidGroupDND;
