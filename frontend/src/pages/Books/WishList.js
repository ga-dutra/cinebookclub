import { useContext, useEffect, useState } from "react";
import WishListBox from "../../components/WishListBox";
import useToken from "../../hooks/useToken";
import { SearchContext } from "../../contexts/searchContext";
import { getUserBooksWishlist } from "../../services/services";
import CentralMessage from "../../components/CentralMessage";

export default function WishList() {
  const token = useToken();
  const [userBooksWishList, setUserBooksWishList] = useState([]);
  const { inputCleaner } = useContext(SearchContext);
  useEffect(() => {
    async function getReadings() {
      const response = await getUserBooksWishlist(token);
      setUserBooksWishList(response);
    }
    getReadings();
  }, [inputCleaner]);

  return userBooksWishList.length !== 0 ? (
    <>
      {userBooksWishList.map((book) => (
        <WishListBox key={book.id} book={book}></WishListBox>
      ))}
    </>
  ) : (
    <CentralMessage
      message={
        "Você ainda não possui livros na sua lista de desejos. Adicione-os, pesquisando acima."
      }
    />
  );
}
