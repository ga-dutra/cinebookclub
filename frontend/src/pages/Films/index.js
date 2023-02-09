import { useContext } from "react";
import FilmSearchBox from "./FilmSearchBox";
import { UserContext } from "../../contexts/userContext";
import Watchings from "./Watchings.js";
import FilmsWishList from "./FilmsWishList";

export default function Films() {
  const { bottomMenuSelected, mainMenu2Selected } = useContext(UserContext);
  if (bottomMenuSelected !== "Filmes") return <></>;
  if (mainMenu2Selected === "LIDOS/ASSISTIDOS") {
    return (
      <>
        <FilmSearchBox></FilmSearchBox>
        <Watchings></Watchings>
      </>
    );
  } else if (mainMenu2Selected === "LISTA DE DESEJOS") {
    return (
      <>
        <FilmSearchBox></FilmSearchBox>
        <FilmsWishList></FilmsWishList>
      </>
    );
  } else return <></>;
}
