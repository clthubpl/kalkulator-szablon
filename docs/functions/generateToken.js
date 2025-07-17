// functions/generateToken.js
const crypto = require('crypto');

exports.handler = async function(event) {
  const { expiresIn } = JSON.parse(event.body || '{}');
  const token = crypto.randomBytes(16).toString('hex');
  const validUntil = Date.now() + (expiresIn || 12) * 3600 * 1000;

  return {
    statusCode: 200,
    body: JSON.stringify({ token, validUntil })
  };
};
