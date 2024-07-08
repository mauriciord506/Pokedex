import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "../../index.css";
import { createTheme, MantineProvider } from "@mantine/core";
import Header from "../Header/Header";
import GenerationsNavBar from "../GenerationsNavBar/GenerationsNavBar";
import Results from "../Results/Results";
import FilterGrid from "../FilterGrid/FilterGrid";
import Footer from "../Footer/Footer";
import { PokeDataContextProvider } from "../../context/PokeDataContext";
import { SearchContextProvider } from "../../context/SearchContext";
import { FilterAndSortContextProvider } from "../../context/FilterAndSortContext";
import { SelectedPokemonIdContextProvider } from "../../context/SelectedPokemonIdContext";
import { PokemonInfoModalContextProvider } from "../../context/PokemonInfoModalContext";

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
          <FilterAndSortContextProvider>
            <Header />
            <main>
              <GenerationsNavBar />
              <FilterGrid />
              <SelectedPokemonIdContextProvider>
                <PokemonInfoModalContextProvider>
                  <Results />
                </PokemonInfoModalContextProvider>
              </SelectedPokemonIdContextProvider>
            </main>
            <Footer />
          </FilterAndSortContextProvider>
        </SearchContextProvider>
      </PokeDataContextProvider>
    </MantineProvider>
  );
}

export default Pokedex;
