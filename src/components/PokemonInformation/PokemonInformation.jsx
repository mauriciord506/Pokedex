import { Image, Group, Title, Text } from "@mantine/core";
import {
  getPokemonLanguage,
  getPokemonTypes,
  getLanguageTextEntries,
  getAbilities,
  getEvolutionChain,
  getHeight,
  getWeight,
  getPokemonImages,
} from "../../helpers/helperFN";
import PokemonStatsInfo from "../PokemonStatsInfo/PokemonStatsInfo";
import PokemonTypes from "../PokemonTypes/PokemonTypes";

function PokemonInformation({ pokemon }) {
  console.log(pokemon);
  const lang = getPokemonLanguage(pokemon.id);
  const pokemon_height = getHeight(pokemon.height);
  const PokemonData = {
    info: {
      description: getLanguageTextEntries(lang, pokemon.flavor_text_entries)[0],
      genera: getLanguageTextEntries(lang, pokemon.genera)[0],
      types: getPokemonTypes(pokemon.types),
    },
    tabsData: {
      about: {
        habitat: pokemon.habitat || "Unknown",
        abilities: getAbilities(pokemon.abilities),
        height:
          pokemon_height < 10 ? `${pokemon_height} m` : `${pokemon_height} cm`,
        weight: `${getWeight(pokemon.weight)} kg`,
      },
      evolution: {
        generation: pokemon.generation.number,
        ...getEvolutionChain(pokemon.evolution),
      },
      stats: pokemon.stats,
    },
  };
  const pokemonImageSource = getPokemonImages(pokemon.sprites);
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
        <Group justify="center" m={`1rem auto`}>
          <PokemonTypes types_array={pokemon.types} />
        </Group>
        <Title order={2}>{`${PokemonData.info.genera?.genus}:`}</Title>
        <Text mb={`1rem`}>{PokemonData.info.description?.flavor_text}</Text>
        <PokemonStatsInfo tabsData={PokemonData.tabsData} />
      </div>
    </>
  );
}

export default PokemonInformation;
