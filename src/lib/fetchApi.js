import { fetchData } from "../lib/fetchData";

/**
 * Fetches data from the API based on the provided parameters.
 *
 * @param {AbortSignal} controllerSignal - The signal object used to abort the fetch request.
 * @param {number} generation_number - The generation number of the Pokemon.
 * @param {string} pokemonNameOrId - The name or ID of the Pokemon.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
export const fetchApi = async (
  controllerSignal,
  generation_number,
  pokemonNameOrId
) => {
  const results = generation_number
    ? await fetchData(controllerSignal, generation_number, null)
    : pokemonNameOrId
    ? await fetchData(controllerSignal, null, pokemonNameOrId)
    : console.error("Wrong parameters");
  console.log(results);
  return results;
};
