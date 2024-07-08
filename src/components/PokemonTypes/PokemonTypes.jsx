import { Badge, Image } from "@mantine/core";
import Icons from "../../images/Images";

function PokemonTypes({ types_array }) {
  const ICO = { ...Icons };
  return types_array.map((typeObj, index) => (
    <Badge
      key={`${typeObj.type.name}-{${index}`}
      leftSection={
        <Image
          w="12"
          h="12"
          fit="contain"
          src={`${ICO[typeObj.type.name].default}`}
        />
      }
      size="md"
      radius="sm"
      className={`bg-color-${typeObj.type.name}`}
    >
      {typeObj.type.name}
    </Badge>
  ));
}
export default PokemonTypes;
