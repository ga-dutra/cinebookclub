import { useEffect, useState } from "react";
import styled from "styled-components";
import TrendingConfirmDialog from "./TrendingConfirmDialog";

export default function TrendingBox({ media }) {
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });

  useEffect(() => {
    if (media.origin_country) {
      setConfirmDialog({
        isOpen: false,
        message: `Quer adicionar `,
        type: "addTvShowWishList",
      });
    } else {
      setConfirmDialog({
        isOpen: false,
        message: `Quer adicionar `,
        type: "addFilmWishList",
      });
    }
  }, []);
  if (
    media.origin_country &&
    !(
      media.origin_country.includes("BR") ||
      media.origin_country.includes("US") ||
      media.origin_country.includes("CA") ||
      media.origin_country.includes("IN") ||
      media.origin_country.includes("JN") ||
      media.origin_country.includes("KO")
    )
  )
    return <></>;
  const unavailableImg =
    "https://www.fullperformance.com.br/images/evento/2020-03-01_1a_logo_default3.jpg";
  const imgURLbase = "https://image.tmdb.org/t/p/w220_and_h330_face";

  return (
    <Wrapper>
      <MediaPicture
        onClick={() => {
          setConfirmDialog({ ...confirmDialog, isOpen: true });
        }}
        src={`${imgURLbase}${media.backdrop_path}` || unavailableImg}
        alt={`${media.title} poster`}
      />
      <MediaDescription
        onClick={() => {
          setConfirmDialog({ ...confirmDialog, isOpen: true });
        }}
      >
        <MediaTitle
          length={
            media.title
              ? media.title.split("-")[0].length
              : media.name.split("-")[0].original_name
          }
        >
          {media.title ? media.title.split("-")[0] : media.name.split("-")[0]}
        </MediaTitle>
        <MediaRating>{Number(media.vote_average).toFixed(1)}</MediaRating>
      </MediaDescription>
      <TrendingConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        img={media.img}
        title={media.title}
        media={media}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 320px;
  border-radius: 6px;
  background-color: #fec5bb;
  margin: 12px 12px;
  font-family: "Lato", sans-serif;
  align-items: center;
  justify-content: flex-start;
`;

const MediaPicture = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 6px;
`;

const MediaTitle = styled.h1`
  text-align: center;
  font-size: ${(props) => (props.length > 20 ? "16px" : "18px")};
  font-weight: 700;
  width: 80%;
`;

const MediaRating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #ffffff;
  font-weight: 700;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

const MediaDescription = styled.div`
  height: 80px;
  position: relative;
  width: 100%;
  padding: 6px;
  justify-content: center;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
