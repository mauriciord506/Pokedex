import { List, Table } from "@mantine/core";

function AboutTabsTable({ data }) {
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
  const tableHeadins = Object.keys(data.about).map((key, index) => (
    <Table.Th key={`th-${key}-${index}`} tt={`capitalize`}>
      {key}
    </Table.Th>
  ));
  const tableRows = Object.values(data.about).map((value, index, array) => {
    if (Array.isArray(value)) {
      const listItems = [];
      value.forEach((item, index) =>
        listItems.push(
          <List.Item key={`power-${index}`} tt={`capitalize`}>
            {item}
          </List.Item>
        )
      );
      return (
        <Table.Td key={`td-${value}-${index}`}>
          <List size={`sm`} listStyleType={`none`}>
            {listItems}
          </List>
        </Table.Td>
      );
    } else {
      return (
        <Table.Td key={`td-${value}-${index}`}>
          {index === 0
            ? `Gen-${String.fromCharCode(romanNumbers[value])}`
            : value}
        </Table.Td>
      );
    }
  });
  return (
    <Table>
      <Table.Caption>{`Pokémon Information`}</Table.Caption>
      <Table.Thead>
        <Table.Tr>{tableHeadins}</Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr tt={`capitalize`} style={{ verticalAlign: "text-top" }}>
          {tableRows}
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}

export default AboutTabsTable;
