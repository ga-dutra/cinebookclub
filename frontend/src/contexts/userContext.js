import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useLocalStorage("userData", {});
  const [bottomMenuSelected, setBottomMenuSelected] = useState("Início");
  const [mainMenu1Selected, setMainMenu1Selected] = useState("POPULARES");
  const [mainMenu2Selected, setMainMenu2Selected] =
    useState("LIDOS/ASSISTIDOS");
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        bottomMenuSelected,
        setBottomMenuSelected,
        mainMenu1Selected,
        setMainMenu1Selected,
        mainMenu2Selected,
        setMainMenu2Selected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
