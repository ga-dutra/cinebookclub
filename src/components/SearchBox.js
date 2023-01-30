import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { getApiBooks } from "../services/services";
import SearchedBook from "./SearchedBook";
import { SearchContext } from "../contexts/searchContext";

const unavailableImg =
  "https://www.fullperformance.com.br/images/evento/2020-03-01_1a_logo_default3.jpg";
export default function SearchBox() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [booksList, setBooksList] = useState([]);
  const [render, setRender] = useState(0);
  const { inputCleaner } = useContext(SearchContext);

  useEffect(() => {
    async function updateBooksList() {
      if (search.length > 3) {
        const requisition = await getApiBooks(search);
        setBooks(requisition.data.items);
        const newList = [];
        if (books) {
          books.forEach((book) => {
            if (book.volumeInfo.authors && book.volumeInfo.description) {
              const bookUnity = {
                title: book.volumeInfo.title,
                author: book.volumeInfo.authors[0],
                img: book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : unavailableImg,
                description: book.volumeInfo.description,
                book_api_id: book.id,
                page_count: book.volumeInfo.pageCount || "",
              };
              newList.push(bookUnity);
            }
          });
        }
        setBooksList(newList);
        setRender(render + 1);
      } else setBooksList([]);
    }
    updateBooksList();
  }, [search]);

  useEffect(() => {
    setSearch("");
  }, [inputCleaner]);

  return (
    <Wrapper>
      <BoxSearch>
        <DebounceInput
          autoComplete="off"
          placeholder="Procure pelo título"
          type="text"
          name="search"
          value={search}
          debounceTimeout={300}
          onChange={(e) => setSearch(e.target.value)}
        ></DebounceInput>
      </BoxSearch>
      <StyledSearch>
        <FiSearch />
      </StyledSearch>
      <ResultList>
        {booksList.length !== 0
          ? booksList.map((book, index) => (
              <SearchedBook
                key={index}
                title={book.title}
                author={book.author}
                img={book.img}
                description={book.description}
                book_api_id={book.book_api_id}
                page_count={book.page_count}
                id={book.id}
              />
            ))
          : ""}
      </ResultList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 95vw;
  position: relative;
`;
const BoxSearch = styled.form`
  input {
    background-color: #ffffff;
    height: 45px;
    width: calc(100vw - 30px);
    margin: 0 15px;
    border-radius: 8px;
    border: none;
    font-size: 19px;
    align-items: center;
    padding: 0 15px;
    margin-top: 12px;
    z-index: 1;

    @media (max-width: 850px) {
    }
  }

  input::placeholder {
    color: #c6c6c6;
  }
  textarea:focus,
  input:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
  }
`;

const ResultList = styled.div`
  width: calc(100vw - 30px);
  margin: 10px 15px;
  height: auto;

  display: flex;
  flex-direction: column;
`;
const StyledSearch = styled.div`
  position: absolute;
  top: 22px;
  right: 8px;
  z-index: 2;
  color: #c6c6c6;
  font-size: 24px;
  cursor: pointer;
`;
