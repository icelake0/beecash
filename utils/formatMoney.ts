export default function formatMoney(amount = 0) {
  const formattedAmount = new Intl.NumberFormat("en-GP").format(amount);

  return formattedAmount;
}
