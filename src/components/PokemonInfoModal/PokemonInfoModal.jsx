import { useContext } from "react";
import { Modal, Stack, Text } from "@mantine/core";
import { PokemonInfoModalContext } from "../../context/PokemonInfoModalContext";

function PokemonInfoModal({ children, title }) {
  const { opened, handlers } = useContext(PokemonInfoModalContext);
  const romanNumbers = {
    1: "8544",
    2: "8545",
    3: "8546",
    4: "8547",
    5: "8548",
    6: "8549",
    7: "8550",
    8: "8551",
    9: "8552",
  };
  return (
    <Modal.Root opened={opened} onClose={handlers.close} size="md">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header pb={0} style={{ backgroundColor: "inherit" }}>
          <Modal.Title>
            <Stack gap={`0`}>
              <Text fw={`bold`} fs={`italic`}>
                GENERATION -
                <Text component="span" fs="initial" fw={`inherit`}>
                  {" "}
                  {`${String.fromCharCode(
                    romanNumbers[title.generation.number]
                  )}`}
                </Text>
              </Text>
              <Text fw={`bold`}>{`#${title.Id}`}</Text>
            </Stack>
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body> {children}</Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default PokemonInfoModal;
