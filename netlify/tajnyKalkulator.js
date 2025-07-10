exports.handler = async function(event, context) {
  const { dlugosc, szerokosc, wysokosc, gestosc } = JSON.parse(event.body);
  const wynik = dlugosc * szerokosc * wysokosc * gestosc;
  return {
    statusCode: 200,
    body: JSON.stringify({ result: wynik })
  };
};
