import { useContext } from "react";
import BottomNavigationMenu from "../../components/BottomNavigationMenu";
import { UserContext } from "../../contexts/userContext";

export default function Home() {
  const { menuClicked } = useContext(UserContext);
  return (
    <>
      {menuClicked}
      <BottomNavigationMenu />
    </>
  );
}
