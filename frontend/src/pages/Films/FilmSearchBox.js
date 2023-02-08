import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { FiSearch } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { getApiFilms, getApiTvShows } from "../../services/external_api";
import { SearchContext } from "../../contexts/searchContext";
import SearchedFilm from "./SearchedFilm";
import { UserContext } from "../../contexts/userContext";

const unavailableImg =
  "https://www.fullperformance.com.br/images/evento/2020-03-01_1a_logo_default3.jpg";
const imgURLbase = "https://image.tmdb.org/t/p/w220_and_h330_face";
export default function FilmSearchBox() {
  const [search, setSearch] = useState("");
  const [filmsList, setFilmsList] = useState([]);
  const { inputCleaner } = useContext(SearchContext);
  const { bottomMenuSelected } = useContext(UserContext);

  useEffect(() => {
    async function updateFilmsList() {
      if (search.length > 3) {
        const requisition =
          bottomMenuSelected === "Filmes"
            ? await getApiFilms(search)
            : await getApiTvShows(search);

        const films = requisition.data.results.slice(0, 5);
        const newList = [];
        if (films) {
          films.forEach((film) => {
            const filmUnity = {
              title: film.title || film.original_name,
              img: film.poster_path
                ? `${imgURLbase}${film.poster_path}`
                : unavailableImg,
              overview: film.overview || "...",
              api_id: String(film.id),
              release_date:
                bottomMenuSelected === "Filmes"
                  ? String(film.release_date)
                  : String(film.first_air_date),
              vote_average: film.vote_average,
              medias_id: bottomMenuSelected === "Filmes" ? 2 : 3,
            };
            newList.push(filmUnity);
          });
          setFilmsList(newList);
        }
      } else setFilmsList([]);
    }
    const timerId = setTimeout(() => {
      updateFilmsList();
    }, 350);
    return () => clearTimeout(timerId);
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
        {filmsList.length !== 0
          ? filmsList.map((film, index) => (
              <SearchedFilm key={index} film={film} />
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
