import { useContext, useRef, useEffect } from "react";
import { Grid } from "@mantine/core";
import Isotope from "isotope-layout";
import PokeCard from "../PokeCard/PokeCard";
import PokemonInfoModal from "../PokemonInfoModal/PokemonInfoModal";
import PokemonInformation from "../PokemonInformation/PokemonInformation";
import { PokeDataContext } from "../../context/PokeDataContext";
import { FilterAndSortContext } from "../../context/FilterAndSortContext";
import { SelectedPokemonIdContext } from "../../context/SelectedPokemonIdContext";
function Results() {
  const { data } = useContext(PokeDataContext);
  const { filterBy, setFilterBy, sortByValue, setSortByValue, sortByOptions } =
    useContext(FilterAndSortContext);
  const { selectedPokemonId, setSelectedPokemonId } = useContext(
    SelectedPokemonIdContext
  );

  const selectedPokemonData =
    Array.isArray(data) && data[0]
      ? data.find((dataset) => dataset.id === selectedPokemonId)
      : null;
  const ISOTOPE = useRef(null);
  const prevFilterByValue = useRef(filterBy);
  const prevSortedByValue = useRef(sortByValue);

  useEffect(() => {
    setFilterBy("*");
    setSortByValue("orginal-order");
  }, [data, setFilterBy, setSortByValue]);

  useEffect(() => {
    ISOTOPE.current = new Isotope(".pokemon-grid", {
      itemSelector: ".pokemon-card",
      transitionDuration: 600,
      layoutMode: "fitRows",
      getSortData: sortByOptions,
    });
    return () => ISOTOPE.current.destroy();
  }, [data]);

  useEffect(() => {
    if (prevFilterByValue.current !== filterBy) {
      filterBy === "*"
        ? ISOTOPE.current.arrange({ filter: `*` })
        : ISOTOPE.current.arrange({ filter: `.${filterBy}` });
      prevFilterByValue.current = filterBy;
    }
    if (prevSortedByValue.current !== sortByValue) {
      ISOTOPE.current.arrange({ sortBy: sortByValue });
      prevSortedByValue.current = sortByValue;
    }
  }, [filterBy, sortByValue]);
  return (
    <>
      {selectedPokemonData && (
        <PokemonInfoModal
          title={{
            Id: selectedPokemonData.id,
            generation: selectedPokemonData.generation,
          }}
        >
          <PokemonInformation pokemon={selectedPokemonData} />
        </PokemonInfoModal>
      )}
      <Grid className="pokemon-grid" justify="center">
        <Grid.Col span={{ base: 12 }}>
          {!data || !data[0] || !Array.isArray(data)
            ? "NO POKEMONS CAUGHT! 😒"
            : data.map((dataset) => (
                <PokeCard
                  pokemon={dataset}
                  setSelectedPokemonId={setSelectedPokemonId}
                  key={`${dataset.name}-${dataset.id}`}
                />
              ))}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Results;
