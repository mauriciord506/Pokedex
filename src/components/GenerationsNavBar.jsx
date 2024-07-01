import { useContext, useEffect, useState, useRef } from "react";
import { ActionIcon, Grid } from "@mantine/core";
import { fetchApi } from "../lib/fetchApi";
import { PokeDataContext } from "../context/PokeDataContext";

/**
 * Renders a navigation bar for selecting Pokémon generations.
 * @returns {JSX.Element} The GenerationsNavBar component.
 */
function GenerationsNavBar() {
  const generations = [
    { number: 1, charCode: "8544" },
    { number: 2, charCode: "8545" },
    { number: 3, charCode: "8546" },
    { number: 4, charCode: "8547" },
    { number: 5, charCode: "8548" },
    { number: 6, charCode: "8549" },
    { number: 7, charCode: "8550" },
    { number: 8, charCode: "8551" },
    { number: 9, charCode: "8552" },
  ];
  const [selectedGeneration, setSelectedGeneration] = useState(1);
  const { setData } = useContext(PokeDataContext);
  const aboutControllerRef = useRef(null);
  const gradientColor = { from: "indigo", to: "blue", deg: 311 };

  function handleClick(generation_number) {
    console.log(`Generation ${generation_number}`);
    setSelectedGeneration(generation_number);
  }

  useEffect(() => {
    // Check if the aboutControllerRef is defined
    if (aboutControllerRef.current) {
      // If it is defined, abort the previous request
      aboutControllerRef.current.abort();
      console.log(`ABORTED REQUEST GEN-${selectedGeneration}`);
    }

    // Create a new AbortController instance
    const controller = new AbortController();
    const signal = controller.signal;
    // Store the controller in the aboutControllerRef for future reference
    aboutControllerRef.current = controller;

    // Asynchronous function to fetch data
    (async () => {
      try {
        // Call the fetchApi function with the provided signal, selectedGeneration, and null parameter
        const results = await fetchApi(signal, selectedGeneration, null);
        // Check if the request was not aborted
        if (!signal.aborted) {
          // Set the fetched data using the setData function
          setData(results);
        }
      } catch (error) {
        // Handle any fetch errors
        if (signal.aborted) {
          console.log("Request was aborted");
        } else {
          console.error("Fetch error:", error);
        }
      }
    })();

    // Cleanup function to be called when the component is unmounted or the dependency array changes
    return () => {
      // Abort the request when the cleanup function is called
      controller.abort();
    };
  }, [setData, selectedGeneration]);

  return (
    <>
      <Grid justify="center" align="flex-start" m={`2rem auto`}>
        <Grid.Col span={{ base: 12 }}>
          <ActionIcon.Group className="actionicons-navbar-container generation-container">
            {generations.map((gen) => {
              return (
                <ActionIcon
                  key={`gen-btn-${gen.number}`}
                  onClick={(e) => {
                    console.log(e.target);
                    handleClick(gen.number);
                  }}
                  variant={
                    selectedGeneration === gen.number ? "filled" : "gradient"
                  }
                  gradient={gradientColor}
                  aria-label={`Pokémon Generation ${gen.number}`}
                  fz={`1.5rem`}
                  size={`50`}
                  className={selectedGeneration === gen.number ? "active" : ""}
                >
                  {String.fromCharCode(gen.charCode)}
                </ActionIcon>
              );
            })}
          </ActionIcon.Group>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default GenerationsNavBar;
