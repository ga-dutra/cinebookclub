import { useContext } from "react";
import styled from "styled-components";
import BottomNavigationMenu from "../../components/BottomNavigationMenu";
import Header from "../../components/Header";
import MainMenu from "../../components/MainMenu";
import { UserContext } from "../../contexts/userContext";
import BookBox from "../../components/BookBox";
import SearchBox from "../../components/SearchBox";

export default function Home() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  return (
    <Wrapper>
      <Header />
      <MainMenu />
      <BookBox></BookBox>
      {bottomMenuSelected === "Livros" ? <SearchBox></SearchBox> : ""}

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
