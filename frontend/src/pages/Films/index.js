import { useContext } from "react";
import FilmSearchBox from "./FilmSearchBox";
import { UserContext } from "../../contexts/userContext";
import Watchings from "./Watchings.js";
import FilmsWishList from "./FilmsWishList";

export default function Films() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  if (bottomMenuSelected !== "Filmes") return <></>;
  if (mainMenuSelected === "LIDOS/ASSISTIDOS") {
    return (
      <>
        <FilmSearchBox></FilmSearchBox>
        <Watchings></Watchings>
      </>
    );
  } else if (mainMenuSelected === "LISTA DE DESEJOS") {
    return (
      <>
        <FilmSearchBox></FilmSearchBox>
        <FilmsWishList></FilmsWishList>
      </>
    );
  } else return <></>;
}
