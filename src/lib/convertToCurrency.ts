const convertToCurrency = (amount: number, factor = 100) =>
  Math.round(Number(amount) * factor);

export default convertToCurrency;
