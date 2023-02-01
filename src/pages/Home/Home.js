import { useContext } from "react";
import styled from "styled-components";
import BottomNavigationMenu from "../../components/BottomNavigationMenu";
import Header from "../../components/Header";
import MainMenu from "../../components/MainMenu";
import { UserContext } from "../../contexts/userContext";
import Books from "../Books/index.js";
import Films from "../Films/index.js";
import TvShows from "../TvShows/index.js";

export default function Home() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);

  return (
    <Wrapper>
      <Header />
      <MainMenu />
      <Books />
      <Films />
      <TvShows />
      <BottomNavigationMenu />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f8edeb;
`;
