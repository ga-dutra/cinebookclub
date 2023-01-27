import { useState } from "react";
import styled from "styled-components";

export default function MainMenu() {
  const [menuSelected, setMenuSelected] = useState("");
  return (
    <MenuWrapper>
      <MenuOption
        name={"LIDOS/ASSISTIDOS"}
        setMenuSelected={setMenuSelected}
        menuSelected={menuSelected}
      ></MenuOption>
      <MenuOption
        setMenuSelected={setMenuSelected}
        menuSelected={menuSelected}
        name={"LISTA DE DESEJOS"}
      ></MenuOption>
    </MenuWrapper>
  );
}

function MenuOption({ name, menuSelected, setMenuSelected }) {
  const [isSelected, setIsSelected] = useState(false);
  function selectMenu() {
    if (menuSelected !== name) {
      setIsSelected(true);
      setMenuSelected(name);
    } else {
      setIsSelected(!isSelected);
      setMenuSelected("");
    }
  }
  return (
    <OptionWrapper
      onClick={selectMenu}
      isSelected={isSelected}
      menuSelected={menuSelected}
      name={name}
    >
      {name}
    </OptionWrapper>
  );
}

const MenuWrapper = styled.div`
  display: flex;
  width: 100vw;
  margin-top: 80px;
  justify-content: space-evenly;
  z-index: 1;
  background-color: #e8e8e4;
  height: 100px;
  align-items: center;
`;

const OptionWrapper = styled.div`
  width: 132px;
  height: 38px;
  background-color: ${(props) =>
    props.menuSelected === props.name && props.isSelected
      ? "#59A5D8"
      : "#ece4db"};
  box-shadow: ${(props) =>
    props.menuSelected === props.name && props.isSelected
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
