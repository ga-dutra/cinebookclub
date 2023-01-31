import { useContext, useEffect, useState } from "react";
import BookBox from "../../components/ReadingBox";
import useToken from "../../hooks/useToken";
import { getUserReadings } from "../../services/services";
import LoadingAnimation from "../../common/LoadingAnimation";
import { SearchContext } from "../../contexts/searchContext";

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
    ""
  );
}
