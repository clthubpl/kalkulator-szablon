// netlify/functions/start-session.js
exports.handler = async function(event, context) {
  const ip = event.headers["x-nf-client-connection-ip"] || "unknown";
  // ... Twoja logika sesji ...
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Session started" }),
  };
}
