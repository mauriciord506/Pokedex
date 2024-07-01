import { useContext } from "react";
import { Modal } from "@mantine/core";
import { PokemonInfoModalContext } from "../context/PokemonInfoModalContext";

function PokemonInfoModal({ children, title }) {
  const { opened, handlers } = useContext(PokemonInfoModalContext);
  return (
    <Modal opened={opened} onClose={handlers.close} title={`#${title}`}>
      {children}
    </Modal>
  );
}

export default PokemonInfoModal;
