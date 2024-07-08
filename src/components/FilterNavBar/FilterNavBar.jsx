import { useContext } from "react";
import { ActionIcon, Image, List, Title, Tooltip } from "@mantine/core";
import { IconPokeball } from "@tabler/icons-react";
import { PokeDataContext } from "../../context/PokeDataContext";
import { FilterAndSortContext } from "../../context/FilterAndSortContext";
import Icons from "../../images/Images";

function FilterNavBar() {
  const { data } = useContext(PokeDataContext);
  const { filterBy, setFilterBy } = useContext(FilterAndSortContext);
  const ICO = { ...Icons };

  function getPokemonTypes(pokemons) {
    const pokemonTypes = pokemons
      .map((pokemon) => pokemon.types[0].type.name)
      .sort();
    pokemonTypes.unshift("*");

    return Array.from(new Set(pokemonTypes));
  }

  const filterClickHandler = (filterKeyword) => setFilterBy(filterKeyword);
  return data && Array.isArray(data) ? (
    <div className="filter-container">
      <Title order={2} tt={"capitalize"}>
        Filtered By: {filterBy === "*" ? "All" : `${filterBy}`}
      </Title>
      <nav className="filter-navigation">
        <List>
          {Array.isArray(data) && data[0]
            ? getPokemonTypes(data).map((type, index) => (
                <List.Item key={`filter-item-${index + 1}`}>
                  <Tooltip
                    tt="capitalize"
                    openDelay={150}
                    arrowOffset={25}
                    arrowSize={7}
                    key={`tooltip-type-${type}`}
                    className={index ? type : "pokemons"}
                    label={type === "*" ? "All" : type}
                    transitionProps={{ transition: "skew-down", duration: 400 }}
                    events={{ hover: true, focus: true, touch: false }}
                    withArrow
                  >
                    <ActionIcon
                      key={`ActionIco-type-${type}`}
                      className={index ? type : "pokemons"}
                      variant="filled"
                      aria-label={type === "*" ? "All Pokémons" : type}
                      size="xl"
                      fz="1rem"
                      onClick={() => {
                        filterClickHandler(type);
                      }}
                    >
                      {!index ? (
                        <IconPokeball stroke={2} />
                      ) : (
                        <Image
                          w="28"
                          h="28"
                          fit="contain"
                          src={`${ICO[type].default}`}
                        />
                      )}
                    </ActionIcon>
                  </Tooltip>
                </List.Item>
              ))
            : "There aren't Pokémons"}
        </List>
      </nav>
    </div>
  ) : (
    false
  );
}

export default FilterNavBar;
