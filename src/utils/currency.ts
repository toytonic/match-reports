export const formatCurrency = (value: number) =>
  new Intl.NumberFormat().format(value);
