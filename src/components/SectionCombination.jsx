import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";

export const SectionCombination = ({ sequence, number }) => {
  const [accountingCombination, setAccountingCombination] = useState(null);

  useEffect(() => {
    const allGenereateCombinations = generateCombinations(number);
    const allCombinations = getCombinations(sequence, number);
    const combinedArray = combineObjects(
      allGenereateCombinations,
      allCombinations
    );
    // setAccountingCombination(getCombinations(sequence, number));
    setAccountingCombination(combinedArray);
  }, []);

  const getCombinations = (sequenceArray, numberCharacterToCombine) => {
    let combination = "",
      resultAccountCombination = [],
      cont = 0,
      cont_2 = 0;

    for (let i = 0; i < sequenceArray.length; i++) {
      combination = "";
      cont = 0;
      if (i > sequenceArray.length - numberCharacterToCombine) {
        while (cont < numberCharacterToCombine) {
          if (sequenceArray[i + cont]) {
            combination += `${sequenceArray[i + cont]}`;
          } else {
            cont_2 = 0;
            while (combination.length < numberCharacterToCombine) {
              combination += `${sequenceArray[cont_2]}`;
              cont_2++;
            }
          }
          cont++;
        }
      } else {
        //Generamos la combinacion del caracter actual con el qu le sigue

        while (cont < numberCharacterToCombine) {
          combination += `${sequenceArray[i + cont]}`;
          cont++;
        }
      }

      // Verificamos si la combinacion esta en el objeto que contiene el conteo
      // de las veces que aparecen las combinaciones
      if (resultAccountCombination[`_${combination}`]) {
        resultAccountCombination[`_${combination}`] += 1;
      } else {
        resultAccountCombination = {
          ...resultAccountCombination,
          [`_${combination}`]: 1,
        };
      }
    }

    return resultAccountCombination;
  };

  function generateCombinations(size) {
    const combinations = {};

    function backtrack(current, remaining) {
      if (current.length === size) {
        combinations["_" + current] = 0;
        return;
      }

      backtrack(current + "0", remaining - 1);
      if (remaining > 0) {
        backtrack(current + "1", remaining - 1);
      }
    }

    backtrack("", size);

    return combinations;
  }

  const combineObjects = (obj1, obj2) => {
    const combinedObj = { ...obj1 };

    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (combinedObj.hasOwnProperty(key)) {
          combinedObj[key] = Math.max(combinedObj[key], obj2[key]);
        } else {
          combinedObj[key] = obj2[key];
        }
      }
    }

    return combinedObj;
  };

  return (
    <>
      {accountingCombination && (
        <section className="container secondPostulateAccountingCombination">
          <BarChart
            title={`Combinaciones de 2^${number}`}
            data={accountingCombination}
          />
        </section>
      )}
    </>
  );
};
