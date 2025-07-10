// netlify/functions/tajnyKalkulator.js

exports.handler = async function(event, context) {
  // Odczytaj dane z zapytania POST (np. liczby do obliczeń)
  const { liczba1, liczba2 } = JSON.parse(event.body);

  // Tu Twój TAJNY algorytm (np. mnożenie, dzielenie, itp.)
  const wynik = (liczba1 * 7.43 + liczba2 / 2.1); // ← przykładowy wzór

  return {
    statusCode: 200,
    body: JSON.stringify({ result: wynik })
  };
};
