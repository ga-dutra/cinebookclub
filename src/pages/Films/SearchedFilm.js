import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../contexts/userContext";
import FilmConfirmDialog from "./FilmConfirmDialog";

export default function SearchedFilm({ film }) {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });
  useEffect(() => {
    if (bottomMenuSelected === "Filmes") {
      if (mainMenuSelected === "LIDOS/ASSISTIDOS") {
        setConfirmDialog({
          isOpen: false,
          message: `Quer adicionar `,
          type: "addFilmWatching",
        });
      } else if (mainMenuSelected === "LISTA DE DESEJOS") {
        setConfirmDialog({
          isOpen: false,
          message: `Quer adicionar `,
          type: "addFilmWishList",
        });
      }
    } else if (bottomMenuSelected === "Séries") {
      if (mainMenuSelected === "LIDOS/ASSISTIDOS") {
        setConfirmDialog({
          isOpen: false,
          message: `Quer adicionar `,
          type: "addTvShowWatching",
        });
      } else if (mainMenuSelected === "LISTA DE DESEJOS") {
        setConfirmDialog({
          isOpen: false,
          message: `Quer adicionar `,
          type: "addTvShowWishList",
        });
      }
    }
  }, []);

  return (
    <Wrapper>
      <img
        onClick={() => {
          setConfirmDialog({ ...confirmDialog, isOpen: true });
        }}
        src={film.img}
        alt=""
      />
      <h1
        onClick={() => {
          setConfirmDialog({ ...confirmDialog, isOpen: true });
        }}
      >
        {" "}
        <Title>{film.title}</Title> -{" "}
        <Vote_Average>{film.vote_average}</Vote_Average>{" "}
      </h1>
      <FilmConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        img={film.img}
        title={film.title}
        film={film}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  img {
    width: 39px !important;
    height: 52px !important;
    border-radius: 6px;
    object-fit: contain;
    cursor: pointer;
  }
  h1 {
    font-size: 19px;
    font-weight: 400;
    color: #515151;
    margin: 0px 10px;
    cursor: pointer;
    font-family: "Lato";
  }
`;

const Title = styled.span`
  font-weight: 700;
`;

const Vote_Average = styled.span`
  font-style: italic;
  font-size: 18px;
`;
