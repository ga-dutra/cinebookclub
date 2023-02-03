import { useContext } from "react";
import styled from "styled-components";
import BottomNavigationMenu from "../../components/BottomNavigationMenu";
import Header from "../../components/Header";
import MainMenu from "../../components/MainMenu";
import { UserContext } from "../../contexts/userContext";
import Books from "../Books/index.js";
import Films from "../Films/index.js";
import TvShows from "../TvShows/index.js";
import Trending from "../Trending";

export default function Home() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);

  return (
    <Wrapper>
      <Header />
      {bottomMenuSelected ? <MainMenu /> : ""}

      <ContentWrapper>
        <Books />
        <Films />
        <TvShows />
        <Trending />
      </ContentWrapper>
      <BottomNavigationMenu />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: #f8edeb;
  margin-bottom: 100px;
`;

const ContentWrapper = styled.div`
  margin-top: 190px;
  max-height: max-content;
`;
