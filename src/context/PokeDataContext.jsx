import { createContext, useState } from "react";

export const PokeDataContext = createContext({});

export function PokeDataContextProvider({ children }) {
  const [data, setData] = useState(null);
  return (
    <PokeDataContext.Provider value={{ data, setData }}>
      {children}
    </PokeDataContext.Provider>
  );
}
