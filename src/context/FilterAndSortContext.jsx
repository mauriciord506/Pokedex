import { createContext, useState } from "react";

export const FilterAndSortContext = createContext({});

export function FilterAndSortContextProvider({ children }) {
  const [filterBy, setFilterBy] = useState("*");
  const [sortByValue, setSortByValue] = useState("original-order");
  const sortByOptions = {
    name: ".name",
    id: ".id parseInt",
    type: "[data-type]",
  };
  return (
    <FilterAndSortContext.Provider
      value={{
        filterBy,
        setFilterBy,
        sortByValue,
        setSortByValue,
        sortByOptions,
      }}
    >
      {children}
    </FilterAndSortContext.Provider>
  );
}
