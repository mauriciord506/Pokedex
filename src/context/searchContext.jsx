import { createContext, useState } from "react";

export const SearchContext = createContext({});

export function SearchContextProvider({ children }) {
  const [searchContextValue, setSearchContextValue] = useState("");

  return (
    <SearchContext.Provider
      value={{ searchContextValue, setSearchContextValue }}
    >
      {children}
    </SearchContext.Provider>
  );
}
