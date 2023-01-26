import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useLocalStorage("userData", {});
  const [menuClicked, setMenuClicked] = useState("");

  return (
    <UserContext.Provider
      value={{ userData, setUserData, menuClicked, setMenuClicked }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
