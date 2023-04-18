export const getPriceChangePercent = (lastPrice: number, openPrice: number) => {
  var rez = ((lastPrice - openPrice) / openPrice) * 100;
  return rez.toFixed(2);
}

export const getPriceWithSpace = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

