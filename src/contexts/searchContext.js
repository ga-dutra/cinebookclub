import { createContext, useState } from "react";

const SearchContext = createContext();

const SearchStorage = ({ children }) => {
  const [inputCleaner, setInputCleaner] = useState(false);
  return (
    <SearchContext.Provider value={{ inputCleaner, setInputCleaner }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchStorage };
