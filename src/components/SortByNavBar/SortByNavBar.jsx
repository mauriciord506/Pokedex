import { useContext, useState } from "react";
import { ActionIcon, Title, Tooltip } from "@mantine/core";
import {
  IconPokeball,
  IconSortAZ,
  IconSort09,
  IconBolt,
} from "@tabler/icons-react";
import { FilterAndSortContext } from "../../context/FilterAndSortContext";

function SortByNavBar() {
  const { sortByValue, sortByOptions, setSortByValue } =
    useContext(FilterAndSortContext);
  const [selectedSorting, setSelectedSorting] = useState(sortByValue);
  const settings = {
    gradientColor: { from: "indigo", to: "blue", deg: 311 },
    transitionProps: { transition: "skew-down", duration: 400 },
    events: { hover: true, focus: true, touch: false },
    tooltipColor: "blue",
  };
  const icons = {
    name: "IconSortAZ",
    id: "IconSort09",
  };
  return (
    <div className="sortby-container">
      <Title order={2} tt={`capitalize`}>
        Sorting By: {sortByValue === "original-order" ? "Default" : sortByValue}
      </Title>
      <ActionIcon.Group className="actionicons-navbar-container">
        <Tooltip
          openDelay={150}
          arrowOffset={25}
          arrowSize={7}
          label={`Default`}
          transitionProps={settings.transitionProps}
          events={settings.events}
          color={settings.tooltipColor}
          withArrow
        >
          <ActionIcon
            size={`xl`}
            variant={
              selectedSorting === "original-order" ? "filled" : "gradient"
            }
            gradient={settings.gradientColor}
            onClick={() => {
              setSortByValue("original-order");
              setSelectedSorting("original-order");
            }}
            className={selectedSorting === "original-order" ? "active" : ""}
          >
            <IconPokeball stroke={2} />
          </ActionIcon>
        </Tooltip>
        {Object.keys(sortByOptions).map((key) => {
          return (
            <Tooltip
              key={`tooltip-${key}`}
              tt={`capitalize`}
              openDelay={150}
              arrowOffset={25}
              arrowSize={7}
              label={key}
              transitionProps={settings.transitionProps}
              events={settings.events}
              color={settings.tooltipColor}
              withArrow
            >
              <ActionIcon
                key={`sortBy-${key}`}
                tt={`capitalize`}
                size={`xl`}
                variant={selectedSorting === key ? "filled" : "gradient"}
                gradient={settings.gradientColor}
                onClick={() => {
                  setSortByValue(key);
                  setSelectedSorting(key);
                }}
                className={selectedSorting === key ? "active" : ""}
              >
                {icons[key] === "IconSortAZ" ? (
                  <IconSortAZ />
                ) : icons[key] === "IconSort09" ? (
                  <IconSort09 />
                ) : (
                  <IconBolt />
                )}
              </ActionIcon>
            </Tooltip>
          );
        })}
      </ActionIcon.Group>
    </div>
  );
}

export default SortByNavBar;
