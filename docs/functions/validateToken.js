// functions/validateToken.js
exports.handler = async function(event) {
  const { token, issuedAt, expiresIn } = JSON.parse(event.body || '{}');
  const now = Date.now();
  const isValid = now < issuedAt + (expiresIn || 12) * 3600 * 1000;

  return {
    statusCode: 200,
    body: JSON.stringify({ valid: isValid })
  };
};
