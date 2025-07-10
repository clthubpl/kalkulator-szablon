exports.handler = async function(event, context) {
  // Odczytaj dane przesłane z frontendu
  const { liczba1, liczba2 } = JSON.parse(event.body);

  // Wstaw tutaj dowolną logikę! Przykład: suma
  const wynik = liczba1 + liczba2;

  // Zwróć wynik pod kluczem "result"
  return {
    statusCode: 200,
    body: JSON.stringify({ result: wynik })
  };
};
