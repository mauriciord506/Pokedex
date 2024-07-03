import { Image, Group, Title, Text } from "@mantine/core";
import {
  getPokemonLanguage,
  getPokemonTypes,
  getLanguageTextEntries,
  getAbilities,
  getEvolutionChain,
} from "../helpers/helperFN";
import PokemonStatsInfo from "./PokemonStatsInfo";

function PokemonInformation({ pokemon }) {
  const generationNumber = pokemon.generation.number;
  const lang = getPokemonLanguage(pokemon.id);
  const PokemonData = {
    info: {
      description: getLanguageTextEntries(lang, pokemon.flavor_text_entries)[0],
      genera: getLanguageTextEntries(lang, pokemon.genera)[0],
      types: getPokemonTypes(pokemon.types),
    },
    tabsData: {
      about: {
        generation: generationNumber,
        habitat: pokemon.habitat || "Unknown",
        abilities: getAbilities(pokemon.abilities),
        height: pokemon.height,
        weight: pokemon.weight,
      },
      evolution: getEvolutionChain(pokemon.evolution),
      stats: pokemon.stats,
    },
  };
  const pokemonImageSource =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.other["official-artwork"].front_default;
  console.log(pokemon);
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
        <Title order={2}>{`${PokemonData.info.genera?.genus}:`}</Title>
        <Text>{PokemonData.info.description?.flavor_text}</Text>
        <PokemonStatsInfo tabsData={PokemonData.tabsData} />
      </div>
    </>
  );
}

export default PokemonInformation;
