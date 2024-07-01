import { Grid } from "@mantine/core";
import FilterNavBar from "./FilterNavBar";
import SortByNavBar from "./SortByNavBar";

function FilterGrid() {
  return (
    <Grid m={`2rem auto`}>
      <Grid.Col span={{ xs: 12, sm: 4 }}>
        <SortByNavBar />
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 8 }}>
        <FilterNavBar />
      </Grid.Col>
    </Grid>
  );
}

export default FilterGrid;
