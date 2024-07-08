function getPokemonTypes(types_array) {
  return types_array.map((typeObj) => typeObj.type.name);
}

function getPokemonImages(sprites) {
  return (
    sprites.other.dream_world.front_default ||
    sprites.other["official-artwork"].front_default
  );
}

function getAnimatedSprites(Id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${Id}.gif`;
}
function getPNGImages(Id) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${Id}.png`;
}

function getPokemonNameOrIdFromURL(endpoint_url) {
  const regex = /\/(\w+)(\/|\b)$/;
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

function getEvolutionChain(Obj) {
  function getEvolutionLineage(chain) {
    if (!chain.evolves_to) {
      return;
    }
    return {
      species: {
        name: chain.species.name,
        id: +getPokemonNameOrIdFromURL(chain.species.url),
        url: chain.species.url,
      },
      evolution_details: chain.evolution_details,
      evolves_to: chain.evolves_to.map((evolution) =>
        getEvolutionLineage(evolution)
      ),
    };
  }
  const evolutionChain = {
    species: {
      name: Obj.species.name,
      id: +getPokemonNameOrIdFromURL(Obj.species.url),
      url: Obj.species.url,
    },
    evolution_details: Obj.evolution_details,
    evolves_to: Obj.evolves_to.map((evolution) =>
      getEvolutionLineage(evolution)
    ),
  };
  return evolutionChain;
}

function getHeight(decimiters) {
  return decimiters > 10 ? decimiters / 10 : decimiters * 10;
}

function getWeight(hectograms) {
  return hectograms / 10;
}

export {
  getAnimatedSprites,
  getPokemonNameOrIdFromURL,
  getPokemonLanguage,
  getPokemonTypes,
  getLanguageTextEntries,
  getAbilities,
  getEvolutionChain,
  getHeight,
  getWeight,
  getPokemonImages,
  getPNGImages,
};
