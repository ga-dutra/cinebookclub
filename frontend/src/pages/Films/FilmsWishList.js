import { useContext, useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { SearchContext } from "../../contexts/searchContext";
import { getUserFilmsWishlist } from "../../services/services";
import FilmWishListBox from "./FilmWishListBox";

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
    ""
  );
}
