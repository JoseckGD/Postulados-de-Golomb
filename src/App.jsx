import { useEffect, useRef, useState } from "react";
import "./App.css";
import BarChart from "./components/BarChart";
import { SectionCombination } from "./components/SectionCombination";
import LineChart from "./components/LineChart";
import { fft } from "fft-js";

const datos =
  "0000100110010010111111011001100110010010111111011001100110010010111101100100000010111101100100001001100100101111011001001001100110010010011001100100101111011001000010011001100110010010111101100100101111011001000010111101100110111101100100101111111111011001000000100110011001100110111111110110010000100110010010111111111111011001000010011001001001100110011001100110010010111101100100001011111111011001001011110110010010111101100100100110011001100100101111111101100100001001100110011001100100100110011001001011110110010010011001100100101111111101100110111101100110011001001011110110010010011001100100001001100110011001100110010000101111011001000000100110011001100110010010011001100110010010111101100110011001100110010010111111011001000010011001001001100110010010111101100100001011110110010010111101100110011001000010111101100100000010011001100110010010111101100100101111011001100110011001100110010010111101100100001001100110111101100100001011110110010010011001100100001011110110010000100110011001001001100110011001100110011001001011111111011001001001100110011001100110010010111111011001100110010000101111011001000000100110011001100100100110011001100110011001100100100110011001100110011001000010111101100100100110011001100110010000101111011001000010011001100110011001100100100110011001100110011001100110010000100110010010111111110110010000100110011001100100101111111101100100001001100110011001100100100110011001100110010000101111011001000000100110011001100100101111011001000000101111011001100110011001100100101111011001001011111111011001000010011001100110010010111101100100000010011001100100101111011001001001100110010010011001100100101111011001000000100110011001101111011001001011110110010000100110010010111101100110011001001011111101100110011001100110010010111101100100100110011001100110010000101111011001000000101111011001000010011001001001100110010000101111011001000000100110011001100110011001100100101111111111111111110110010000100110010010011001100110010010111111111111011001101111011001001001100110";

function App() {
  const [sequence, setSequence] = useState(datos);
  const [firstPostulateAccounting, setFirstPostulateAccounting] =
    useState(null);

  const [sequenceArray, setSequenceArray] = useState(null);

  const [thirdPostulate, setThirdPostulate] = useState(null);

  const [last, setLast] = useState(null);

  let ones = 0,
    zeros = 0;

  const inputFile = useRef(null);

  const firstPostulate = () => {
    const sequenceArray = sequence.split("");
    for (let i = 0; i < sequenceArray.length; i++) {
      sequenceArray[i] === "1" ? ones++ : zeros++;
    }

    setFirstPostulateAccounting({ 1: ones, 0: zeros });
  };

  const secondPostulate = () => {
    setSequenceArray(sequence.split(""));
  };

  const thirdPostulateA = () => {
    const sequenceMain = sequence.split("");
    const sequenceCopy = sequence.split("");
    let matchingNumbers = 0,
      noMatchingNumbers = 0;
    const res = [];

    for (let i = 0; i < sequenceMain.length + 1; i++) {
      for (let j = 0; j < sequenceMain.length; j++) {
        if (sequenceMain[j] === sequenceCopy[j]) {
          matchingNumbers += 1;
        } else {
          noMatchingNumbers += 1;
        }
      }
      let lastElement = sequenceCopy.pop(); // Eliminar el último elemento y guardarlo en una variable
      sequenceCopy.unshift(lastElement); // Insertar el último elemento al inicio del arreglo
      res.push((matchingNumbers - noMatchingNumbers) / sequenceMain.length);
      matchingNumbers = 0;
      noMatchingNumbers = 0;
    }
    setThirdPostulate(res);
    performFFT(res);
  };

  const performFFT = (data) => {
    const dataSize = 2003; // Tamaño de los datos de entrada

    // Función para calcular la siguiente potencia de dos
    const nextPowerOfTwo = (n) => {
      let power = 1;
      while (power < n) {
        power *= 2;
      }
      return power;
    };

    const fftSize = nextPowerOfTwo(dataSize); // Calcular el tamaño de la FFT

    const input = data.map((value) => Math.abs(value)); // Convertir los datos de entrada en números complejos

    // Rellenar los valores adicionales con ceros
    while (input.length < fftSize) {
      input.push(0); // Agregar ceros como números complejos
    }

    // Realizar la FFT en los datos de entrada
    const spectrum = fft(input);

    // Imprimir el resultado
    setLast(spectrum);
  };

  const handleSequenceTextChange = (event) => {
    setSequence(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.includes("text/plain")) {
      const reader = new FileReader();
      reader.onload = handleFileRead;
      reader.readAsText(file);
    }
  };

  const handleFileRead = (event) => {
    const content = event.target.result;
    setSequence(content);
  };

  const handleReset = () => {
    setSequence("");
    setSequenceArray(null);
    setFirstPostulateAccounting(null);
    setThirdPostulate(null);
    setLast(null);
  };

  return (
    <>
      <h1>Postulados de Golomb</h1>

      <section className="container inputs">
        <div className="input-container">
          <label htmlFor="text-file" className="input-label">
            Archivo de Texto:
          </label>
          <input
            type="file"
            accept=".txt"
            id="text-file"
            onChange={handleFileChange}
            ref={inputFile}
          />
        </div>

        <div className="input-container">
          <label htmlFor="sequence" className="input-label">
            Secuencia de 1 y 0 :
          </label>
          <textarea
            name="sequence"
            id="sequence"
            cols="160"
            rows="10"
            style={{ resize: "none" }}
            value={sequence}
            onChange={handleSequenceTextChange}
          />
        </div>
      </section>

      <section className="container buttons">
        <button className="button" onClick={firstPostulate}>
          Primer postulado
        </button>

        <button className="button-reiniciar" onClick={handleReset}>
          Reiniciar
        </button>
      </section>

      {firstPostulateAccounting && (
        <>
          <h2>Pimer Postulado: Contabilización</h2>
          <section className="container firstPostulateAccounting">
            <BarChart
              title="Conteo de 0s y 1s"
              data={{
                _0: firstPostulateAccounting[0],
                _1: firstPostulateAccounting[1],
              }}
            />
          </section>

          <section className="container buttons">
            <button className="button" onClick={secondPostulate}>
              Segundo Postulado
            </button>

            <button className="button-reiniciar" onClick={handleReset}>
              Reiniciar
            </button>
          </section>
        </>
      )}

      {sequenceArray && (
        <>
          <h2>Segundo Postulado: Contabilización</h2>

          <SectionCombination sequence={sequenceArray} number={2} />
          <SectionCombination sequence={sequenceArray} number={3} />
          <SectionCombination sequence={sequenceArray} number={4} />
          <SectionCombination sequence={sequenceArray} number={5} />
          <SectionCombination sequence={sequenceArray} number={6} />
          <SectionCombination sequence={sequenceArray} number={7} />
          <SectionCombination sequence={sequenceArray} number={8} />

          <section className="container buttons">
            <button className="button" onClick={thirdPostulateA}>
              Tercer Postulado
            </button>

            <button className="button-reiniciar" onClick={handleReset}>
              Reiniciar
            </button>
          </section>
        </>
      )}

      {thirdPostulate && (
        <>
          <h2>Tercer Postulado: Autocorrelación + EDP</h2>

          <section className="container firstPostulateAccounting">
            <LineChart title="Autocorrelación" data={thirdPostulate} />
          </section>
        </>
      )}

      {last && (
        <>
          <section className="container firstPostulateAccounting">
            <LineChart title="Espectro de Densidad de Potencia" data={last} />
          </section>
          <section className="container buttons">
            <button className="button-reiniciar" onClick={handleReset}>
              Reiniciar
            </button>
          </section>
        </>
      )}
    </>
  );
}

export default App;
