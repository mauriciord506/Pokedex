import { List, Table } from "@mantine/core";

function AboutTabsTable({ data }) {
  const tableHeadins = Object.keys(data.about).map((key, index) => (
    <Table.Th key={`th-${key}-${index}`} tt={`capitalize`}>
      {key}
    </Table.Th>
  ));
  const tableRows = Object.values(data.about).map((value, index) => {
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
        <Table.Td
          tt={value.match(/cm/) ? "lowercase" : null}
          key={`td-${value}-${index}`}
        >
          {value}
        </Table.Td>
      );
    }
  });
  return (
    <Table withTableBorder>
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
