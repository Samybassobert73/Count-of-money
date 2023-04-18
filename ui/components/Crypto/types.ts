export type currency = {
  id: string;
  symb: string;
  name: string;
  rank: number
  price: number;
  img: string;
}

export type eth = {
  id: "ethereum";
  symb: "ETH";
  name: "Ethereum";
  rank: number
  price: number;
  img: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880";
}

export type selectedCurrency = currency & {
  amount: string;
};

export type propsConverter = {
  currencies: currency[];
}

export type propsConvertField = {
  currencies: currency[];
  current: selectedCurrency;
  onChange: (c: selectedCurrency) => void;
}

export type propsConverterList = {
  currencies: currency[];
  onSelect: (c: currency) => void;
  onClose: () => void;
}