import { Image } from "@mantine/core";
import logoImage from "../../images/pokemon_logo.svg";
export default function Logo() {
  return (
    <a href="/index.html">
      <Image src={logoImage} alt="Pokémon Logo" h={118} />
    </a>
  );
}
