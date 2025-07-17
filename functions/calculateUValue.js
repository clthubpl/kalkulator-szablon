exports.handler = async function(event, context) {
  try {
    const { liczba1, liczba2, token } = JSON.parse(event.body || "{}");

    // Prosty token hardcoded (do podmiany na prawdziwy system lub zczytywany z Netlify secret)
    const SECRET_TOKEN = "CLT_SECURE_2025";

    if (token !== SECRET_TOKEN) {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: "Brak dostępu – niewłaściwy token." })
      };
    }

    // Przykładowe obliczenie – do zastąpienia logiką z kalkulatora (np. wzór U, dB, kg, itd.)
    const wynik = liczba1 + liczba2;

    return {
      statusCode: 200,
      body: JSON.stringify({ result: wynik })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Błąd przetwarzania danych.", details: error.message })
    };
  }
};
