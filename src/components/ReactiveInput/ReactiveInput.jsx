import { useContext, useEffect, useRef, useState } from "react";
import { Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { fromEvent } from "rxjs";
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";
import { SearchContext } from "../../context/SearchContext";
import { PokeDataContext } from "../../context/PokeDataContext";
import { fetchApi } from "../../lib/fetchApi";

function ReactiveInput() {
  const inputRef = useRef(null);
  const { setData } = useContext(PokeDataContext);
  const { searchContextValue, setSearchContextValue } =
    useContext(SearchContext);

  // Controlled State local input.
  const [inputValue, setInputValue] = useState(searchContextValue);

  useEffect(() => {
    const inputElement = inputRef.current;

    const subscription = fromEvent(inputElement, "input")
      .pipe(
        debounceTime(1500),
        map((event) => event.target.value),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        setSearchContextValue(value);
      });
    return () => {
      subscription.unsubscribe();
    };
  }, [setSearchContextValue]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (searchContextValue) {
      (async () => {
        const results = await fetchApi(signal, null, searchContextValue);
        results ? setData([results]) : setData(results);
        setSearchContextValue("");
      })();
    }
    return () => {
      controller.abort();
    };
  }, [searchContextValue, setSearchContextValue, setData]);

  //Updates the controlled input after context cleanup
  useEffect(() => {
    setInputValue(searchContextValue);
  }, [searchContextValue]);

  return (
    <Input
      variant="filled"
      ref={inputRef}
      placeholder="Pokemon Name or ID"
      leftSection={<IconSearch size={16} />}
      value={inputValue}
      onChange={(event) => setInputValue(event.target.value)}
    />
  );
}

export default ReactiveInput;
