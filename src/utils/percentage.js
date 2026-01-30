function calcularPercentual(presentes, total) {
  if (total === 0) return 0;
  return Number(((presentes / total) * 100).toFixed(2));
}

module.exports = {
  calcularPercentual
};
