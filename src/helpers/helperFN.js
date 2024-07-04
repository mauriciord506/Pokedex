import { Badge, Image } from "@mantine/core";
import Icons from "../images/Images";

function getPokemonTypes(types_array) {
  const badges = [];

  const pokemonType = types_array.map((pokemonType, index) => {
    const ICO = { ...Icons };
    badges.push(
      <Badge
        key={`${pokemonType.type.name}-{${index}`}
        leftSection={
          <Image
            w="12"
            h="12"
            fit="contain"
            src={`${ICO[pokemonType.type.name].default}`}
          />
        }
        size="md"
        radius="sm"
        className={`bg-color-${pokemonType.type.name}`}
      >
        {pokemonType.type.name}
      </Badge>
    );
    return pokemonType.type.name;
  });
  return [badges, pokemonType];
}

function getPokemonIDFromURL(endpoint_url) {
  const regex = /\/(\d+)\/$/;
  const match = endpoint_url.match(regex);
  if (match) {
    return match[1];
  }
  return null;
}
function getPokemonLanguage(pokemon_id) {
  /*Pokemon API is not consitent with Language entries for Genus and Flavors text descriptons this function return default language based on Pokemon ID*/
  return pokemon_id < 899 ? "es" : "en";
}
function getLanguageTextEntries(lang, entries) {
  return entries.filter((entry) => entry.language.name === lang);
}
function getAbilities(abilities) {
  return abilities.map((skill) => skill.ability.name);
}

function getEvolutionChain(obj) {
  let evolutionChain = [];
  evolutionChain.push(obj.species);

  function traverse(evolutionArray) {
    if (evolutionArray.length === 0) {
      return;
    }
    evolutionArray.forEach((evolution) => {
      evolutionChain.push({
        ...evolution.species,
        min_level: evolution.evolution_details[0].min_level,
      });
      traverse(evolution.evolves_to);
    });
  }
  traverse(obj.evolves_to);
  return evolutionChain;
}

export {
  getPokemonIDFromURL,
  getPokemonLanguage,
  getPokemonTypes,
  getLanguageTextEntries,
  getAbilities,
  getEvolutionChain,
};
