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

function getLanguageTextEntries(lang, entries) {
  return entries.filter((entry) => entry.language.name === lang);
}
function getDescriptionVersion(text_description_array, version) {
  return text_description_array.filter(
    (entry) => entry.version.name === version
  );
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
      evolutionChain.push(evolution.species);
      traverse(evolution.evolves_to);
    });
  }
  traverse(obj.evolves_to);
  return evolutionChain;
}

export {
  getPokemonTypes,
  getLanguageTextEntries,
  getDescriptionVersion,
  getAbilities,
  getEvolutionChain,
};
