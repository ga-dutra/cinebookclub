import { useContext, useEffect, useState } from "react";
import WatchingBox from "./WatchingBox";
import useToken from "../../hooks/useToken";
import { getUserWatchings } from "../../services/services";
import { SearchContext } from "../../contexts/searchContext";
import { UserContext } from "../../contexts/userContext";
import CentralMessage from "../../components/CentralMessage";

export default function Watchings() {
  const token = useToken();
  const [userWatchings, setUserWatchings] = useState([]);
  const { inputCleaner } = useContext(SearchContext);
  const { bottomMenuSelected } = useContext(UserContext);
  const message = `Você ainda não possui ${
    bottomMenuSelected === "Filmes"
      ? "filmes assistidos cadastrados. Adicione-os"
      : "séries assistidas cadastradas. Adicione-as"
  } , pesquisando acima.`;
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
    <CentralMessage message={message} />
  );
}
