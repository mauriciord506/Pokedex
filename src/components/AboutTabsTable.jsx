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
  const tableHeadins = Object.keys(data.about).map((key) => (
    <Table.Th tt={`capitalize`}>{key}</Table.Th>
  ));
  const tableRows = Object.values(data.about).map((value) => {
    if (Array.isArray(value)) {
      const listItems = [];
      value.forEach((item) =>
        listItems.push(<List.Item tt={`capitalize`}>{item}</List.Item>)
      );
      return (
        <List size={`sm`} listStyleType={`none`}>
          {listItems}
        </List>
      );
    } else {
      return <Table.Td>{value}</Table.Td>;
    }
  });
  return (
    <Table>
      <Table.Caption>{`Pokemon Stats`}</Table.Caption>
      <Table.Thead>{tableHeadins}</Table.Thead>
      <Table.Tr style={{ verticalAlign: "text-top" }}>{tableRows}</Table.Tr>
    </Table>
  );
}

export default AboutTabsTable;
