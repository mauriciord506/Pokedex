import { useContext, useRef, useEffect, useState } from "react";
import { Grid } from "@mantine/core";
import Isotope from "isotope-layout";
import PokeCard from "./PokeCard";
import PokemonInfoModal from "./PokemonInfoModal";
import PokemonInformation from "./PokemonInformation";
import { PokeDataContext } from "../context/PokeDataContext";
import { FilterAndSortContext } from "../context/FilterAndSortContext";
function Results() {
  const { data } = useContext(PokeDataContext);
  const { filterBy, setFilterBy, sortByValue, setSortByValue, sortByOptions } =
    useContext(FilterAndSortContext);
  const ISOTOPE = useRef(null);
  const prevFilterByValue = useRef(filterBy);
  const prevSortedByValue = useRef(sortByValue);
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

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
      {Array.isArray(data) && selectedPokemonId ? (
        <PokemonInfoModal title={selectedPokemonId}>
          <PokemonInformation
            pokemon={
              data.find((dataset) => dataset.id === selectedPokemonId)
            }
          />
        </PokemonInfoModal>
      ) : (
        <PokemonInfoModal>
          <PokemonInformation pokemon={data} />
        </PokemonInfoModal>
      )}
      <Grid className="pokemon-grid" justify="center">
        <Grid.Col span={{ base: 12 }}>
          {data && !Array.isArray(data) ? (
            <PokeCard
              setSelectedPokemonId={setSelectedPokemonId}
              pokemon={data}
              key={`${data.name}-${data.id}`}
            />
          ) : !data ? (
            "NO POKEMONS CAUGHT! 😒"
          ) : (
            data.map((dataset) => (
              <PokeCard
                pokemon={dataset}
                setSelectedPokemonId={setSelectedPokemonId}
                key={`${dataset.name}-${dataset.id}`}
              />
            ))
          )}
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Results;
