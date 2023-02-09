import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import FilmSearchBox from "../Films/FilmSearchBox";
import Watchings from "../Films/Watchings";
import TvShowsWishList from "./TvShowsWishList";

export default function TvShows() {
  const { bottomMenuSelected, mainMenu2Selected } = useContext(UserContext);
  if (bottomMenuSelected !== "Séries") return <></>;
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
        <TvShowsWishList></TvShowsWishList>
      </>
    );
  } else return <></>;
}
