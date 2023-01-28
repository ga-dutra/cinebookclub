import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useLocalStorage("userData", {});
  const [bottomMenuSelected, setBottomMenuSelected] = useState("");
  const [mainMenuSelected, setMainMenuSelected] = useState("");
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        bottomMenuSelected,
        setBottomMenuSelected,
        mainMenuSelected,
        setMainMenuSelected,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
