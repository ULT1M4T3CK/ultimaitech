function errorHandler(err, _req, res, _next) {
  const status = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Internal server error';
  console.error(`[website-backend]`, err.message);
  res.status(status).json({ error: message });
}

module.exports = { errorHandler };
