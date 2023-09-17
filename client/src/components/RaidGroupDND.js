import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/raidForm.css";

function RaidGroupDND({ characters }) {
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
        marginLeft: "80px",
        border: "1px solid grey",
        padding: 1,
        minHeight: "280px",
      },
    },
  });

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

  //convert character class: replacing space to "_" for css:
  const characterClassCSS = (characterClass) => {
    const characterClassForCSS = characterClass.split(" ").join("_");
    return characterClassForCSS;
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
  );
}

export default RaidGroupDND;
