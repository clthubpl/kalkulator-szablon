// netlify/functions/tajnyKalkulator.js
exports.handler = async function(event, context) {
  // Parsujemy dane JSON wysłane w body POST:
  const { liczba1, liczba2 } = JSON.parse(event.body);

  // Obliczamy sumę:
  const suma = Number(liczba1) + Number(liczba2);

  // Przygotowujemy odpowiedź z wynikiem:
  return {
    statusCode: 200,
    body: JSON.stringify({ result: suma })
  };
};
