import { Tabs } from "@mantine/core";
import AboutTabsTable from "./AboutTabsTable";
import StatsTabChart from "./StatsTabChart";

function PokemonStatsInfo({ tabsData }) {
  return (
    <Tabs defaultValue="about">
      <Tabs.List>
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="stats">Stats</Tabs.Tab>
        <Tabs.Tab value="evolution">Evolution</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about">
        <AboutTabsTable data={tabsData} />
      </Tabs.Panel>
      <Tabs.Panel value="stats">
        <StatsTabChart chartData={tabsData.stats} />
      </Tabs.Panel>
      <Tabs.Panel value="evolution">Evolution Panel</Tabs.Panel>
    </Tabs>
  );
}

export default PokemonStatsInfo;
