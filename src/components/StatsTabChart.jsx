import { BarChart } from "@mantine/charts";

function Chart({ chartData }) {
  const baseAbbr = ["HP", "ATK", "DEF", "SP-ATK", "SP-DEF", "SPD"];
  const evAbbr = [
    "EV-HP",
    "EV-ATK",
    "EV-DEF",
    "EV-SP-ATK",
    "EV-SP-DEF",
    "EV-SPD",
  ];
  const categories = ["Pokémon Base Stats", "Pokémon EV's (Effort)"];
  const colors = [
    "pink.6",
    "grape.6",
    "violet.6",
    "blue.6",
    "cyan.6",
    "teal.6",
  ];

  const series = [];
  const baseValuesObj = {};
  const effortValuesObj = {};

  chartData.forEach((item, index) => {
    baseValuesObj[baseAbbr[index]] = item.base_stat;
    effortValuesObj[evAbbr[index]] = item.effort;
  });

  colors.forEach((color, index) => {
    series.push({ name: baseAbbr[index], color });
    series.push({ name: evAbbr[index], color });
  });

  const data = categories.map((attribute) =>
    attribute === "Pokémon Base Stats"
      ? {
          stat: attribute,
          ...baseValuesObj,
        }
      : {
          stat: attribute,
          ...effortValuesObj,
        }
  );

  return (
    <BarChart
      h={200}
      dataKey="stat"
      data={data}
      series={series}
      m={`1rem auto`}
    />
  );
}

export default Chart;
