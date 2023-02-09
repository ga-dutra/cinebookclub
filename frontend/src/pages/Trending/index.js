import { useContext, useEffect, useState } from "react";
import LoadingAnimation from "../../common/LoadingAnimation";
import { UserContext } from "../../contexts/userContext";
import {
  getApiTrendingFilms,
  getApiTrendingTvShows,
} from "../../services/external_api";
import styled from "styled-components";
import MediaTypeSelection from "./MediaTypeSelection";
import TrendingBox from "./TrendingBox";

export default function Trending() {
  const { bottomMenuSelected, mainMenu1Selected } = useContext(UserContext);
  const [medias, setMedias] = useState([]);
  const [mediaSelected, setMediaSelected] = useState("");

  useEffect(() => {
    function sortMediaByGrade(array) {
      array.sort(function (a, b) {
        return b.vote_average - a.vote_average;
      });
      return array;
    }
    async function getMedias() {
      try {
        let newMedias;
        if (mediaSelected === "films" && mainMenu1Selected === "POPULARES") {
          newMedias = (await getApiTrendingFilms("popular")).results;
          newMedias = sortMediaByGrade(newMedias);
          setMedias(newMedias);
        } else if (
          mediaSelected === "films" &&
          mainMenu1Selected === "PASSANDO HOJE"
        ) {
          newMedias = (await getApiTrendingFilms("now_playing")).results;
          newMedias = sortMediaByGrade(newMedias);
          setMedias(newMedias);
        } else if (
          mediaSelected === "tvshows" &&
          mainMenu1Selected === "POPULARES"
        ) {
          newMedias = (await getApiTrendingTvShows("popular")).results;
          newMedias = sortMediaByGrade(newMedias);
          setMedias(newMedias);
        } else if (
          mediaSelected === "tvshows" &&
          mainMenu1Selected === "PASSANDO HOJE"
        ) {
          newMedias = (await getApiTrendingTvShows("now_playing")).results;
          newMedias = sortMediaByGrade(newMedias);
          setMedias(newMedias);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getMedias();
  }, [mainMenu1Selected, mediaSelected]);

  if (bottomMenuSelected !== "Início") return <></>;
  if (mainMenu1Selected === "POPULARES") {
    return (
      <Wrapper>
        <MediaTypeSelection
          mediaSelected={mediaSelected}
          setMediaSelected={setMediaSelected}
        />
        <MediaWrapper>
          {medias.length !== 0 && mediaSelected !== ""
            ? medias.map((media) => {
                if (media.backdrop_path) {
                  return (
                    <TrendingBox key={media.id} media={media}></TrendingBox>
                  );
                }
              })
            : ""}
        </MediaWrapper>
        {mediaSelected && medias.length === 0 ? <LoadingAnimation /> : ""}
      </Wrapper>
    );
  } else if (mainMenu1Selected === "PASSANDO HOJE") {
    return (
      <Wrapper>
        <MediaTypeSelection
          mediaSelected={mediaSelected}
          setMediaSelected={setMediaSelected}
        />
        <MediaWrapper>
          {medias.length !== 0 && mediaSelected !== ""
            ? medias.map((media) => {
                if (media.backdrop_path) {
                  return (
                    <TrendingBox key={media.id} media={media}></TrendingBox>
                  );
                }
              })
            : ""}
        </MediaWrapper>
        {mediaSelected && medias.length === 0 ? <LoadingAnimation /> : ""}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: calc(100vw - 20px);
  display: flex;
  margin-top: 50px;
`;

const MediaWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin-left: 20px;
`;
