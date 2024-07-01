import { Button, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

function ThemeSwtich() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Button
      className="theme-switch"
      color={colorScheme === "dark" ? "yellow" : "blue"}
      onClick={() => {
        toggleColorScheme();
      }}
    >
      {colorScheme === "dark" ? (
        <IconSun stroke={1.5} />
      ) : (
        <IconMoon stroke={1.5} />
      )}
    </Button>
  );
}

export default ThemeSwtich;
