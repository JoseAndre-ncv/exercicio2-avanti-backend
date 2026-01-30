function normalizeDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

function today() {
  return new Date().toISOString().split('T')[0];
}

module.exports = {
  normalizeDate,
  today
};
