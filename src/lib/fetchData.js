import { getPokemonNameOrIdFromURL } from "../helpers/helperFN";

/**
 * Fetches Pokemon data from the PokeAPI based on the provided generation number, Pokemon name, or Pokemon ID.
 *
 * @param {AbortSignal} abortSignal - The AbortSignal object used to abort the fetch request.
 * @param {number} generation_number - The generation number of the Pokemon.
 * @param {string} pokemon_name - The name of the Pokemon.
 * @param {number} pokemon_Id - The ID of the Pokemon.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of Pokemon data objects.
 */

export async function fetchData(
  abortSignal,
  generation_number,
  pokemonNameOrId
) {
  const PokeAPI_URL = "https://pokeapi.co/api/v2";
  const GENERATION_ENDPOINT = `${PokeAPI_URL}/generation/`;
  const POKEMON_ENDPOINT = `${PokeAPI_URL}/pokemon/`;
  const SPECIES_ENDPOINT = `${PokeAPI_URL}/pokemon-species/`;

  function fetchApi(API_URL) {
    return fetch(API_URL, { abortSignal });
  }
  async function getPokemonData(SPECIES_ENDPOINT_URL) {
    try {
      const IdOrName = getPokemonNameOrIdFromURL(SPECIES_ENDPOINT_URL);
      const [POKEMON_RESPONSE, SPECIES_RESPONSE] = await Promise.all([
        fetchApi(`${POKEMON_ENDPOINT}${IdOrName}`),
        fetchApi(SPECIES_ENDPOINT_URL),
      ]);
      if (!POKEMON_RESPONSE.ok || !SPECIES_RESPONSE.ok) {
        throw new Error(
          `Error fetching Pokemon data from ${POKEMON_ENDPOINT}${IdOrName} or ${SPECIES_ENDPOINT_URL}`
        );
      }
      const POKEMON_DATA = await POKEMON_RESPONSE.json();
      const SPECIES_DATA = await SPECIES_RESPONSE.json();
      const GENERATION_NUMBER = getPokemonNameOrIdFromURL(
        SPECIES_DATA.generation.url
      );
      const EVOLUTION_RESPONSE = await fetchApi(
        SPECIES_DATA.evolution_chain.url
      );
      if (!EVOLUTION_RESPONSE.ok) {
        throw new Error(
          `Error fetching Evolution data from ${SPECIES_DATA.evolution_chain.url}`
        );
      }
      const EVOLUTION_DATA = await EVOLUTION_RESPONSE.json();

      return {
        abilities: POKEMON_DATA.abilities,
        evolution: EVOLUTION_DATA.chain,
        flavor_text_entries: SPECIES_DATA.flavor_text_entries,
        genera: SPECIES_DATA.genera,
        generation: {
          ...SPECIES_DATA.generation,
          number: GENERATION_NUMBER,
        },
        habitat: SPECIES_DATA.habitat?.name,
        height: POKEMON_DATA.height,
        id: POKEMON_DATA.id,
        name: POKEMON_DATA.name,
        sprites: { ...POKEMON_DATA.sprites },
        stats: POKEMON_DATA.stats,
        types: POKEMON_DATA.types,
        weight: POKEMON_DATA.weight,
      };
    } catch (e) {
      console.error(e);
    }
  }
  async function getPokemonGen(generation_url) {
    try {
      const GENERATION_RESPONSE = await fetchApi(`${generation_url}`);
      if (GENERATION_RESPONSE.ok) {
        const GENERATION_DATA = await GENERATION_RESPONSE.json();
        const RESULTS = Promise.all(
          GENERATION_DATA.pokemon_species.map(async (pokemon) => {
            const POKEMON_DATA = await getPokemonData(pokemon.url);
            return POKEMON_DATA;
          })
        );
        return RESULTS;
      } else {
        throw new Error(
          `Error fetching Generation data from ${generation_url}`
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
  async function getSinglePokemonData(pokemonNameOrId) {
    try {
      const POKEMON_DATA = await getPokemonData(
        `${SPECIES_ENDPOINT}${pokemonNameOrId}/`
      );
      return POKEMON_DATA;
    } catch (e) {
      console.error(e);
    }
  }
  if (generation_number) {
    return getPokemonGen(`${GENERATION_ENDPOINT}${generation_number}/`);
  } else if (pokemonNameOrId) {
    return getSinglePokemonData(pokemonNameOrId.toLowerCase());
  }
}
