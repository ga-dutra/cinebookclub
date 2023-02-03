import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../contexts/userContext";

export default function MainMenu() {
  const { mainMenuSelected, setMainMenuSelected } = useContext(UserContext);
  const { bottomMenuSelected } = useContext(UserContext);

  if (bottomMenuSelected === "Início") {
    return (
      <MenuWrapper>
        <MenuOption
          name={"POPULARES"}
          setMainMenuSelected={setMainMenuSelected}
          mainMenuSelected={mainMenuSelected}
        ></MenuOption>
        <MenuOption
          setMainMenuSelected={setMainMenuSelected}
          mainMenuSelected={mainMenuSelected}
          name={"PASSANDO HOJE"}
        ></MenuOption>
      </MenuWrapper>
    );
  } else
    return (
      <MenuWrapper>
        <MenuOption
          name={"LIDOS/ASSISTIDOS"}
          setMainMenuSelected={setMainMenuSelected}
          mainMenuSelected={mainMenuSelected}
        ></MenuOption>
        <MenuOption
          setMainMenuSelected={setMainMenuSelected}
          mainMenuSelected={mainMenuSelected}
          name={"LISTA DE DESEJOS"}
        ></MenuOption>
      </MenuWrapper>
    );
}

function MenuOption({ name, mainMenuSelected, setMainMenuSelected }) {
  const [isSelected, setIsSelected] = useState(false);
  function selectMenu() {
    if (mainMenuSelected !== name) {
      setIsSelected(true);
      setMainMenuSelected(name);
    } else {
      setIsSelected(!isSelected);
      setMainMenuSelected("");
    }
  }
  return (
    <OptionWrapper
      onClick={selectMenu}
      isSelected={isSelected}
      mainMenuSelected={mainMenuSelected}
      name={name}
    >
      {name}
    </OptionWrapper>
  );
}

const MenuWrapper = styled.div`
  position: fixed;
  display: flex;
  width: 100vw;
  margin-top: 80px;
  justify-content: space-evenly;
  z-index: 4;
  background-color: #e8e8e4;
  height: 100px;
  align-items: center;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.12);
`;

const OptionWrapper = styled.div`
  width: 132px;
  height: 38px;
  background-color: ${(props) =>
    props.mainMenuSelected === props.name && props.isSelected
      ? "#59A5D8"
      : "#ece4db"};
  box-shadow: ${(props) =>
    props.mainMenuSelected === props.name && props.isSelected
      ? "4px 4px 4px rgba(0, 0, 0, 0.25)"
      : "2px 2px 2px rgba(0, 0, 0, 0.25)"};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: "Barlow Condensed", sans-serif;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;
