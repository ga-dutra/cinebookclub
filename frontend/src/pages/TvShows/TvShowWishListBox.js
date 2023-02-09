import styled from "styled-components";
import DeletingDialog from "../../components/DeletingDialog";
import { useState } from "react";

export default function TvShowWishListBox({ tvshow }) {
  const [confirmDialog, setConfirmDialog] = useState({
    type: "deleteTvShowWishList",
    isOpen: false,
  });
  return (
    <Wrapper>
      <TvShowDescription>
        <h1>{tvshow.title}</h1>
        <h2>{tvshow.creator}</h2>
        <h4>{tvshow.seasons_number} temporadas</h4>
      </TvShowDescription>{" "}
      <TvShowPicture src={tvshow.img} alt={`${tvshow.title} poster`} />{" "}
      <TvShowDescription>
        <h5>Sobre:</h5>
        <h3>
          {tvshow.tagline
            ? tvshow.tagline
            : `${tvshow.overview.slice(0, 58)}...`}
        </h3>
      </TvShowDescription>{" "}
      <ion-icon
        onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: true })}
        name="trash-outline"
      ></ion-icon>
      <DeletingDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        img={tvshow.img}
        title={tvshow.title}
        media={tvshow}
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

const TvShowPicture = styled.img`
  width: 60px !important;
  height: 84px !important;
  border-radius: 6px;
  margin-left: 6px;
  object-fit: contain;
`;

const TvShowDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-left: 6px;
  width: 136px;
  max-height: 60px;
  h1 {
    font-weight: 700;
    font-size: 16.5px;
    margin-bottom: 6px;
  }
  h2,
  span {
    font-style: italic;
  }
  h3 {
    font-size: 15px;
  }
  h4 {
    font-size: 13px;
    margin-top: 5px;
  }
  h5 {
    font-size: 14px;
    font-style: italic;
    margin-bottom: 4px;
  }
`;
