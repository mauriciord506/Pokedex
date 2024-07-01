import { Image, Group, Title, Text } from "@mantine/core";
import {
  getPokemonTypes,
  getDescriptionVersion,
  getLanguageTextEntries,
  getAbilities,
  getEvolutionChain,
} from "../helpers/helperFN";
import PokemonStatsInfo from "./PokemonStatsInfo";

function PokemonInformation({ pokemon }) {
  const PokemonData = {
    info: {
      generation: pokemon.generation.number,
      genera: getLanguageTextEntries("es", pokemon.genera)[0],
      description: getDescriptionVersion(
        getLanguageTextEntries("es", pokemon.flavor_text_entries),
        "x"
      )[0],
      types: getPokemonTypes(pokemon.types),
    },
    tabsData: {
      about: {
        weight: pokemon.weight,
        height: pokemon.height,
        habitat: pokemon.habitat,
        abilities: getAbilities(pokemon.abilities),
      },
      evolution: getEvolutionChain(pokemon.evolution),
    },
  };
  const pokemonImageSource =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.other["official-artwork"].front_default;
  console.log(PokemonData);
  return (
    <>
      <div className="pokemon-details">
        <Title order={1} tt={`capitalize`}>
          {pokemon.name}
        </Title>
        <Image
          w={200}
          h={200}
          m={`0 auto`}
          fit="contain"
          src={pokemonImageSource}
          alt={pokemon.name}
        />
        <Group>{PokemonData.info.types[0]}</Group>
        <Title order={2}>{`${PokemonData.info.genera.genus}:`}</Title>
        <Text>{PokemonData.info.description.flavor_text}</Text>
        <PokemonStatsInfo data={""} />
      </div>
    </>
  );
}

export default PokemonInformation;
