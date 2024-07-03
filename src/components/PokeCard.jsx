import { useContext } from "react";
import { Image, Group, Stack, Title, Text } from "@mantine/core";

import { PokemonInfoModalContext } from "../context/PokemonInfoModalContext";
import { getPokemonTypes } from "../helpers/helperFN";
function PokeCard({ pokemon, setSelectedPokemonId }) {
  const pokemonImageSource =
    pokemon.sprites.other.dream_world.front_default ||
    pokemon.sprites.other["official-artwork"].front_default;

  const { handlers } = useContext(PokemonInfoModalContext);

  const pokemonTypes = getPokemonTypes(pokemon.types);
  return (
    <div
      onClick={() => {
        console.log(`Clicked on Pokemon Id ${pokemon.id}`);
        setSelectedPokemonId(pokemon.id);
        handlers.open();
      }}
      className={`pokemon-card ${pokemonTypes[1][0]}`}
      data-category={pokemonTypes[1].join(" ")}
    >
      <div className="pokemon-card-image">
        <Image
          src={pokemonImageSource}
          maw={125}
          mah={100}
          m="0 auto"
          fit="contain"
        />
      </div>
      <Stack align="flex-start" gap="0">
        <Text fw={700} c="dark.9" tt="capitalize">
          #<span className="id">{`${pokemon.id}`}</span>
        </Text>
        <Title
          order={4}
          c="dark.9"
          ta="center"
          tt={"capitalize"}
          m="0 auto"
          className="name"
        >
          {pokemon.name}
        </Title>
      </Stack>
      <Group justify="center" gap="xs">
        {pokemonTypes[0]}
      </Group>
    </div>
  );
}

export default PokeCard;
