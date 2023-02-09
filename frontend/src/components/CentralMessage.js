import styled from "styled-components";

export default function CentralMessage({ message }) {
  return (
    <Wrapper>
      <Message length={message.length}>{message}</Message>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  margin: 0 30px;
  margin-top: calc(8vh);
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Message = styled.h1`
  font-family: "Righteous", cursive;
  font-size: ${(props) => (props.length > 88 ? "19px" : "20px")};
  line-height: 26px;
  font-weight: 400;
  color: #d62839;
`;
