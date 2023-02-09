import { useContext, useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { SearchContext } from "../../contexts/searchContext";
import { getUserFilmsWishlist } from "../../services/services";
import FilmWishListBox from "./FilmWishListBox";
import CentralMessage from "../../components/CentralMessage";

export default function FilmsWishList() {
  const token = useToken();
  const [userFilmsWishList, setUserFilmsWishList] = useState([]);
  const { inputCleaner } = useContext(SearchContext);
  useEffect(() => {
    async function getFilmsWishList() {
      const response = await getUserFilmsWishlist(token);
      setUserFilmsWishList(response);
    }
    getFilmsWishList();
  }, [inputCleaner]);
  return userFilmsWishList.length !== 0 ? (
    <>
      {userFilmsWishList.map((film) => (
        <FilmWishListBox key={film.id} film={film}></FilmWishListBox>
      ))}
    </>
  ) : (
    <CentralMessage
      message={
        "Você ainda não possui filmes na sua lista de desejos. Adicione-os, pesquisando acima ou selecionando o filme desejado na aba 'Ínicio'"
      }
    />
  );
}
