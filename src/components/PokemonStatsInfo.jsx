import { Tabs } from "@mantine/core";
import AboutTabsTable from "./AboutTabsTable";
function PokemonStatsInfo({ tabsData }) {

  return (
    <Tabs defaultValue="about" inverted>
      <Tabs.Panel value="about">
      <AboutTabsTable data={tabsData}/>
      </Tabs.Panel>
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
