export interface TCurrenciesData {
  lastupdate: string;
  rates: {
    [currencyName: string]: number;
  };
  table?: string;
}
