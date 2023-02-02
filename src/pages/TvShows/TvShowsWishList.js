import { useContext, useEffect, useState } from "react";
import useToken from "../../hooks/useToken";
import { SearchContext } from "../../contexts/searchContext";
import { getUserTvShowsWishlist } from "../../services/services";
import TvShowWishListBox from "./TvShowWishListBox";

export default function TvShowsWishList() {
  const token = useToken();
  const [userTvShowsWishList, setUserTvShowsWishList] = useState([]);
  const { inputCleaner } = useContext(SearchContext);
  useEffect(() => {
    async function getTvShowsWishList() {
      const response = await getUserTvShowsWishlist(token);
      setUserTvShowsWishList(response);
    }
    getTvShowsWishList();
  }, [inputCleaner]);
  return userTvShowsWishList.length !== 0 ? (
    <>
      {userTvShowsWishList.map((tvshow) => (
        <TvShowWishListBox key={tvshow.id} tvshow={tvshow}></TvShowWishListBox>
      ))}
    </>
  ) : (
    ""
  );
}
