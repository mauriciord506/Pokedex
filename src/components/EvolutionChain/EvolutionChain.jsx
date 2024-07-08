import "./EvolutionChain.css";
import LZString from "lz-string";
import { useContext } from "react";
import { PokeDataContext } from "../../context/PokeDataContext";
import { SelectedPokemonIdContext } from "../../context/SelectedPokemonIdContext";
import { Image, Text, Title, Stack, Group } from "@mantine/core";
import { getAnimatedSprites, getPNGImages } from "../../helpers/helperFN";

function EvolutionChain({ evolutionChain }) {
  const { setSelectedPokemonId } = useContext(SelectedPokemonIdContext);
  const { setData } = useContext(PokeDataContext);
  const currentGeneration = evolutionChain.generation;
  console.log("EVOLUTION CHAIN", evolutionChain);
  function EvolutionTree({ evolutionChain }) {
    function checkRange(num, min, max) {
      return num >= min && num <= max;
    }

    const generationsMap = {
      1: [1, 151],
      2: [152, 251],
      3: [252, 386],
      4: [387, 493],
      5: [494, 649],
      6: [650, 721],
      7: [722, 809],
      8: [810, 905],
      9: [906, 1025],
    };

    const evolves = evolutionChain.evolves_to.length > 0;
    return (
      <div
        className={`evolution-branch ${evolutionChain.species.name} ${
          evolves ? "multiple" : "single"
        }`}
      >
        <div
          className={`${evolutionChain.species.name}-evolution`}
          onClick={(e) => {
            // setSelectedPokemonId(evolutionChain.species.id);
            let generation;
            for (const key in generationsMap) {
              if (
                checkRange(
                  evolutionChain.species.id,
                  generationsMap[key][0],
                  generationsMap[key][1]
                )
              ) {
                generation = key;
                break;
              }
            }
            console.log(
              `Selected Pokemon Id:${evolutionChain.species.id} belongs to Generation: ${generation}, current Generation is ${currentGeneration}`
            );
            const cachedData = JSON.parse(
              localStorage.getItem(`PokeCachedGen-${generation}`)
            );
            if (generation === currentGeneration) {
              setSelectedPokemonId(evolutionChain.species.id);
            } else if (cachedData) {
              const data = JSON.parse(LZString.decompress(cachedData.dataSet));
              setData(data);
              setSelectedPokemonId(evolutionChain.species.id);
            } else {
              //Fetch Data using API Todo
            }
          }}
        >
          <Stack align="center" justify="center" gap={0}>
            <Group align="center" justify="flex-start" gap={`sm`}>
              {evolutionChain.evolution_details.length ? (
                <Text inline={true}>
                  {evolutionChain.evolution_details[0].trigger.name ===
                  "level-up" ? (
                    <>
                      <Text>
                        {evolutionChain.evolution_details[0].min_level ||
                          evolutionChain.evolution_details[0].min_happiness}
                      </Text>
                      Lvl
                    </>
                  ) : evolutionChain.evolution_details[0].trigger.name ===
                    "use-item" ? (
                    evolutionChain.evolution_details[0].item.name
                  ) : (
                    ""
                  )}
                </Text>
              ) : null}
              <Image
                src={getAnimatedSprites(evolutionChain.species.id)}
                alt={evolutionChain.species.id}
                m={`auto`}
                w={80}
                h={80}
                miw={80}
                fit={`scale-down`}
                onError={(e) =>
                  (e.target.src = getPNGImages(evolutionChain.species.id))
                }
              />
            </Group>
            <Text inline={true} ta={`center`} tt={`capitalize`}>
              <Text fz={`0.8rem`} component="span" inherit>
                {`#${evolutionChain.species.id}`}
              </Text>
              <br />
              {evolutionChain.species.name}
            </Text>
          </Stack>
        </div>
        {evolves && (
          <div className="evolves-to-container">
            {evolutionChain.evolves_to.map((evolution) => (
              <EvolutionTree
                key={evolution.species.id}
                evolutionChain={evolution}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="evolution-chain--container">
      <Title order={3}>Pokémon Evolution</Title>
      <div className={`evolution-chain`}>
        <EvolutionTree evolutionChain={evolutionChain} />
      </div>
    </div>
  );
}

export default EvolutionChain;
