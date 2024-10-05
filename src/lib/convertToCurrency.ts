const convertToCurrency = (amount: number, factor = 100) =>
  Math.round(amount * factor);

export default convertToCurrency;
