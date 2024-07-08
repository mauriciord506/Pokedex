import "./PokemonStatsInfo.css";
import { Tabs } from "@mantine/core";
import AboutTabsTable from "../AboutTabsTable/AboutTabsTable";
import StatsTabChart from "../StatsTabChart/StatsTabChart";
import EvolutionChain from "../EvolutionChain/EvolutionChain";

function PokemonStatsInfo({ tabsData }) {
  function TabsPanelWrapper({ children }) {
    return <div className="tabs-panel-wrapper">{children}</div>;
  }
  return (
    <Tabs defaultValue="about" keepMounted={false}>
      <Tabs.List>
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="stats">Stats</Tabs.Tab>
        <Tabs.Tab value="evolution">Evolution</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about">
        <TabsPanelWrapper>
          <AboutTabsTable data={tabsData} />
        </TabsPanelWrapper>
      </Tabs.Panel>
      <Tabs.Panel value="stats">
        <TabsPanelWrapper>
          <StatsTabChart chartData={tabsData.stats} />
        </TabsPanelWrapper>
      </Tabs.Panel>
      <Tabs.Panel value="evolution">
        <TabsPanelWrapper>
          <EvolutionChain evolutionChain={tabsData.evolution} />
        </TabsPanelWrapper>
      </Tabs.Panel>
    </Tabs>
  );
}

export default PokemonStatsInfo;
