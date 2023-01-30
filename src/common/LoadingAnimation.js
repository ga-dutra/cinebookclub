import { ThreeDots } from "react-loader-spinner";

export default function LoadingAnimation() {
  return (
    <>
      <ThreeDots
        height="50"
        width="250"
        radius="9"
        color="#fcffdf"
        ariaLabel="three-dots-loading"
      />
    </>
  );
}
