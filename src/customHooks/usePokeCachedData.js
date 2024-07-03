import { useEffect } from "react";
import LZString from "lz-string";

const usePokeCachedData = (data) => {
  useEffect(() => {
    if (!Array.isArray(data)) {
      console.warn("Datos no válidos proporcionados");
      return;
    }

    function zipData(dataSet) {
      console.log(
        `Compressing Data : ${generationNumber} - ${dataSet[0].generation.number}`
      );

      const compressedData = LZString.compress(JSON.stringify(dataSet));
      return compressedData;
    }

    const generationNumber = data[0].generation.number;

    const cachedData = localStorage.getItem(
      `PokeCachedGen-${generationNumber}`
    );

    if (!cachedData) {
      // No hay datos en el caché, comprimir y almacenar los datos actuales
      localStorage.setItem(
        `PokeCachedGen-${generationNumber}`,
        JSON.stringify({ generation: generationNumber, dataSet: zipData(data) })
      );
    }
  }, [data]);
};

export default usePokeCachedData;
