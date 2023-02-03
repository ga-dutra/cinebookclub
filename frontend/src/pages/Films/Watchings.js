import { useContext, useEffect, useState } from "react";
import WatchingBox from "./WatchingBox";
import useToken from "../../hooks/useToken";
import { getUserWatchings } from "../../services/services";
import { SearchContext } from "../../contexts/searchContext";
import { UserContext } from "../../contexts/userContext";

export default function Watchings() {
  const token = useToken();
  const [userWatchings, setUserWatchings] = useState([]);
  const { inputCleaner } = useContext(SearchContext);
  const { bottomMenuSelected } = useContext(UserContext);
  useEffect(() => {
    async function getWatchings() {
      const response =
        bottomMenuSelected === "Filmes"
          ? await getUserWatchings(token, 2)
          : await getUserWatchings(token, 3);
      setUserWatchings(response);
    }
    getWatchings();
  }, [inputCleaner]);

  return userWatchings.length !== 0 ? (
    <>
      {userWatchings.map((media) => (
        <WatchingBox key={media.id} media={media}></WatchingBox>
      ))}
    </>
  ) : (
    ""
  );
}
