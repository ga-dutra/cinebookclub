import { useContext } from "react";
import WishList from "./WishList";
import Readings from "./Readings";
import { UserContext } from "../../contexts/userContext";
import SearchBox from "./BookSearchBox";

export default function Books() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  if (bottomMenuSelected !== "Livros") return <></>;
  if (mainMenuSelected === "LIDOS/ASSISTIDOS") {
    return (
      <>
        <SearchBox></SearchBox>
        <Readings></Readings>
      </>
    );
  } else if (mainMenuSelected === "LISTA DE DESEJOS") {
    return (
      <>
        <SearchBox></SearchBox>
        <WishList></WishList>
      </>
    );
  } else return <></>;
}
