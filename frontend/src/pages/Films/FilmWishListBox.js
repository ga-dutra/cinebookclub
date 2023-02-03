import styled from "styled-components";
import { useState } from "react";
import DeletingDialog from "../../components/DeletingDialog";

export default function FilmWishListBox({ film }) {
  const [confirmDialog, setConfirmDialog] = useState({
    type: "deleteFilmWishList",
    isOpen: false,
  });
  return (
    <Wrapper>
      <FilmDescription>
        <h1>{film.title}</h1>
        <h2>{film.runtime} minutos</h2>
        <h4>Nota média: {Number(film.vote_average).toFixed(1)}</h4>
      </FilmDescription>{" "}
      <FilmPicture src={film.img} alt={`${film.title} poster`} />{" "}
      <FilmDescription>
        <h5>Sobre:</h5>{" "}
        <h3>
          {" "}
          {film.tagline
            ? film.tagline
            : `${film.overview.slice(0, 60)}...`}{" "}
        </h3>
      </FilmDescription>{" "}
      <ion-icon
        onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: true })}
        name="trash-outline"
      ></ion-icon>
      <DeletingDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        img={film.img}
        title={film.title}
        media={film}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100vw - 30px);
  margin: 0 15px 26px 15px;
  border-radius: 8px;
  height: 120px;
  max-height: 200px;
  background-color: #fcffdf;
  position: relative;
  font-family: "Lato", sans-serif;
  padding: 10px;
  ion-icon {
    z-index: 3;
    position: absolute;
    bottom: 4px;
    right: 4px;
    font-size: 18px;
  }
`;

const FilmPicture = styled.img`
  width: 60px !important;
  height: 86px !important;
  border-radius: 6px;
  object-fit: contain;
  margin-right: 4px;
`;

const FilmDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 120px;
  max-height: 60px;
  h1 {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 6px;
    margin-right: 4px;
  }
  h2,
  span {
    font-style: italic;
  }
  h3 {
    font-size: 14px;
    max-width: 120px;
  }
  h4 {
    font-size: 13px;
    margin-top: 4px;
  }
  h5 {
    font-size: 15px;
    font-style: italic;
    margin-bottom: 4px;
  }
`;
