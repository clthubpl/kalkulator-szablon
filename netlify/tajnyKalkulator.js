exports.handler = async function(event, context) {
  if (event.httpMethod === "OPTIONS") {
    // Reagujemy na tzw. preflight (zapytanie wstępne wysyłane automatycznie przez przeglądarkę)
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",        // tu możesz podać konkretny origin
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS"
      },
      body: ""  // preflight nie potrzebuje ciała odpowiedzi
    };
  }

  // Parsowanie danych jak wcześniej
  const { liczba1, liczba2 } = JSON.parse(event.body);
  const suma = Number(liczba1) + Number(liczba2);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",        // pozwól na cross-origin
      "Access-Control-Allow-Headers": "Content-Type"
    },
    body: JSON.stringify({ result: suma })
  };
};
