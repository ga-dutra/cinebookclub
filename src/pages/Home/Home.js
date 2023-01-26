import { useContext } from "react";
import styled from "styled-components";
import BottomNavigationMenu from "../../components/BottomNavigationMenu";
import { UserContext } from "../../contexts/userContext";

export default function Home() {
  const { menuClicked } = useContext(UserContext);
  return (
    <Wrapper>
      {menuClicked}
      <BottomNavigationMenu />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f8edeb;
`;
