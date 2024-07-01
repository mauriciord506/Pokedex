import "@mantine/core/styles.css";
import "../index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Header from "./Header";
import GenerationsNavBar from "./GenerationsNavBar";
import Results from "./Results";
import FilterGrid from "./FilterGrid";
import { PokeDataContextProvider } from "../context/PokeDataContext";
import { SearchContextProvider } from "../context/SearchContext";
import { FilterAndSortContextProvider } from "../context/FilterAndSortContext";
import { PokemonInfoModalContextProvider } from "../context/PokemonInfoModalContext";

const theme = createTheme({
  breakpoints: {
    xs: "30em",
    sm: "48em",
    md: "64em",
    lg: "74em",
    xl: "90em",
  },
  colorScheme: "light",
});

function Pokedex() {
  return (
    <MantineProvider theme={theme}>
      <PokeDataContextProvider>
        <SearchContextProvider>
          <Header />
          <GenerationsNavBar />
          <FilterAndSortContextProvider>
            <FilterGrid />
            <PokemonInfoModalContextProvider>
              <Results />
            </PokemonInfoModalContextProvider>
          </FilterAndSortContextProvider>
        </SearchContextProvider>
      </PokeDataContextProvider>
    </MantineProvider>
  );
}

export default Pokedex;
