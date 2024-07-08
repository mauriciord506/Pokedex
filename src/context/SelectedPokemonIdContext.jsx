import { createContext, useState } from "react";

export const SelectedPokemonIdContext = createContext(null);

export function SelectedPokemonIdContextProvider({ children }) {
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  return (
    <SelectedPokemonIdContext.Provider
      value={{ selectedPokemonId, setSelectedPokemonId }}
    >
      {children}
    </SelectedPokemonIdContext.Provider>
  );
}
