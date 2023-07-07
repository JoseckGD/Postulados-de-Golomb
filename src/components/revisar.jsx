const FFT = require("fft.js");

// Crear un objeto FFT con el tamaño deseado
const fft = new FFT(size);

// Preparar los datos de entrada como un arreglo de números complejos
const input = [
  /* datos complejos */
];

// Realizar la FFT en los datos de entrada
const spectrum = fft.createComplexArray();
fft.transform(spectrum, input);

// El resultado de la transformada está en 'spectrum'

// Puedes acceder a las partes real e imaginaria del resultado
const realPart = spectrum.real;
const imagPart = spectrum.imag;

// También puedes calcular las magnitudes y fases
const magnitudes = fft.util.fftMag(spectrum);
const fases = fft.util.fftPhase(spectrum);
