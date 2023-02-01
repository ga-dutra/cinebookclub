import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export default function Films() {
  const { bottomMenuSelected, mainMenuSelected } = useContext(UserContext);
  if (bottomMenuSelected !== "Séries") return <></>;
  return (
    <>
      <>séries</>
    </>
  );
}
