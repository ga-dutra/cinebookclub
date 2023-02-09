import { useContext } from "react";
import WishList from "./WishList";
import Readings from "./Readings";
import { UserContext } from "../../contexts/userContext";
import SearchBox from "./BookSearchBox";

export default function Books() {
  const { bottomMenuSelected, mainMenu2Selected } = useContext(UserContext);

  if (bottomMenuSelected !== "Livros") return <></>;
  if (mainMenu2Selected === "LIDOS/ASSISTIDOS") {
    return (
      <>
        <SearchBox></SearchBox>
        <Readings></Readings>
      </>
    );
  } else if (mainMenu2Selected === "LISTA DE DESEJOS") {
    return (
      <>
        <SearchBox></SearchBox>
        <WishList></WishList>
      </>
    );
  } else return <></>;
}
