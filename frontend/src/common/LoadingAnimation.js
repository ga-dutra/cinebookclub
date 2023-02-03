import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export default function LoadingAnimation() {
  return (
    <Wrapper>
      <ThreeDots
        height="50"
        width="250"
        radius="9"
        color="#D8E2DC"
        ariaLabel="three-dots-loading"
      />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  margin-top: calc(100vw / 2 - 44px);
`;
