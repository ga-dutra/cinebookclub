import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import WishListBox from "../../components/WishListBox";
import useToken from "../../hooks/useToken";
import { SearchContext } from "../../contexts/searchContext";
import { getUserBooksWishlist } from "../../services/services";
import LoadingAnimation from "../../common/LoadingAnimation";

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
  console.log(userBooksWishList);
  return userBooksWishList.length !== 0 ? (
    <>
      {userBooksWishList.map((book) => (
        <WishListBox key={book.id} book={book}></WishListBox>
      ))}
    </>
  ) : (
    ""
  );
}
