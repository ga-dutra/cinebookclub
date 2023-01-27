import styled from "styled-components";
import logoname from "../assets/img/logoname3.png";
import logoname2 from "../assets/img/logoname.svg";

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
  z-index: 0;
  justify-content: center;

  background-color: #fec89a;
`;

const LogoName = styled.img`
  width: 200px;
  height: 30px;
  margin-top: 24px;
`;
