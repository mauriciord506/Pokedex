import { Tabs } from "@mantine/core";
function PokemonStatsInfo({ data }) {
  return (
    <Tabs defaultValue="about" inverted>
      <Tabs.Panel value="about">About Panel</Tabs.Panel>
      <Tabs.Panel value="stats">Stats Panel</Tabs.Panel>
      <Tabs.Panel value="evolution">Evolution Panel</Tabs.Panel>
      <Tabs.List>
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="stats">Stats</Tabs.Tab>
        <Tabs.Tab value="evolution">Evolution</Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

export default PokemonStatsInfo;
