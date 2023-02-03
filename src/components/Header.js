import styled from "styled-components";
import logoname from "../assets/img/logoname3.png";

export default function Header() {
  return (
    <Wrapper>
      <LogoName src={logoname} alt="Logo name: cine-book club" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 80px;
  width: 100vw;
  z-index: 5;
  justify-content: center;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.22);
  background-color: #fec89a;
`;

const LogoName = styled.img`
  width: 220px;
  height: 34px;
  margin-top: 23px;
`;
