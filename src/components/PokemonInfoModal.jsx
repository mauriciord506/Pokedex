import { useContext } from "react";
import { Modal } from "@mantine/core";
import { PokemonInfoModalContext } from "../context/PokemonInfoModalContext";

function PokemonInfoModal({ children, title }) {
  const { opened, handlers } = useContext(PokemonInfoModalContext);
  return (
    <Modal.Root opened={opened} onClose={handlers.close}>
    <Modal.Overlay />
    <Modal.Content>
      <Modal.Header>
        <Modal.Title>{`#${title}`}</Modal.Title>
        <Modal.CloseButton />
      </Modal.Header>
      <Modal.Body> {children}</Modal.Body>
    </Modal.Content>
  </Modal.Root>
  );
}

export default PokemonInfoModal;
