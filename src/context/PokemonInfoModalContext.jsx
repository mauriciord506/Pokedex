import { createContext } from "react";
import { useDisclosure } from "@mantine/hooks";

export const PokemonInfoModalContext = createContext(null);

export function PokemonInfoModalContextProvider({ children }) {
  const [opened, handlers] = useDisclosure(false);
  return (
    <PokemonInfoModalContext.Provider value={{ opened, handlers }}>
      {children}
    </PokemonInfoModalContext.Provider>
  );
}
