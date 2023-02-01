import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import FilmSearchBox from "../Films/FilmSearchBox";
import Watchings from "../Films/Watchings";
import TvShowsWishList from "./TvShowsWishList";

export default function TvShows() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  if (bottomMenuSelected !== "Séries") return <></>;
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
        <TvShowsWishList></TvShowsWishList>
      </>
    );
  } else return <></>;
}
