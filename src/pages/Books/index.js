import { useContext } from "react";
import styled from "styled-components";
import WishList from "./WishList";
import Readings from "./Readings";
import { UserContext } from "../../contexts/userContext";

export default function Books() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  if (mainMenuSelected === "LIDOS/ASSISTIDOS") {
    return <Readings></Readings>;
  } else if (mainMenuSelected === "LISTA DE DESEJOS") {
    return <WishList></WishList>;
  } else return <></>;
}
