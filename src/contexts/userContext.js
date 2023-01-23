import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});
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
