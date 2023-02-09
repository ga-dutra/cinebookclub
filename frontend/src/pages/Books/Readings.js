import { useContext, useEffect, useState } from "react";
import BookBox from "./ReadingBox";
import useToken from "../../hooks/useToken";
import { getUserReadings } from "../../services/services";
import { SearchContext } from "../../contexts/searchContext";
import CentralMessage from "../../components/CentralMessage";

export default function Readings() {
  const token = useToken();
  const [userReadings, setUserReadings] = useState([]);
  const { inputCleaner } = useContext(SearchContext);
  useEffect(() => {
    async function getReadings() {
      const response = await getUserReadings(token);
      setUserReadings(response);
    }
    getReadings();
  }, [inputCleaner]);

  return userReadings.length !== 0 ? (
    <>
      {userReadings.map((book) => (
        <BookBox key={book.id} book={book}></BookBox>
      ))}
    </>
  ) : (
    <CentralMessage
      message={
        "Você ainda não possui leituras cadastradas. Adicione-as, pesquisando acima."
      }
    />
  );
}
