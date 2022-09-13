import React from 'react';

import CurrenciesPopup from '../CurrenciesPopup';

import { TCurrenciesData } from '../../types';

type TConverterBlockProps = {
  currenciesData: TCurrenciesData;
  isLoaded: Boolean;
};

const initialCurrencies = ['UAH', 'USD', 'EUR', 'GBP'];

const ConverterBlock: React.FC<TConverterBlockProps> = ({ currenciesData, isLoaded }) => {
  const rates = currenciesData.rates;
  const ratesArray = Object.entries(rates);

  const [firstCurrencies, setFirstCurrencies] = React.useState(initialCurrencies);
  const [secondCurrencies, setSecondCurrencies] = React.useState(initialCurrencies);

  const [firstActiveCurrency, setFirstActiveCurrency] = React.useState(firstCurrencies[0]);
  const [secondActiveCurrency, setSecondActiveCurrency] = React.useState(secondCurrencies[1]);

  const [firstInputValue, setFirstInputValue] = React.useState<number | string>(1);
  const [secondInputValue, setSecondInputValue] = React.useState<number | string>(0);

  // Utils
  const flipCurrencies = () => {
    setFirstActiveCurrency(secondActiveCurrency);
    setSecondActiveCurrency(firstActiveCurrency);
  };

  const handleChangeCurrenciesList = (prev: string[], currency: string) => [
    currency,
    ...prev.slice(0, prev.length - 1),
  ];

  const checkCurrencyEquality = (list: string[], currency: string) =>
    list.find((currentCurrency) => currentCurrency === currency);

  // Currencies choosing logic
  const handleChangeFirstActiveCurrency = (currency: string) => {
    if (secondActiveCurrency === currency) flipCurrencies();

    setFirstActiveCurrency(currency);
  };

  const handleChangeSecondActiveCurrency = (currency: string) => {
    if (firstActiveCurrency === currency) flipCurrencies();

    setSecondActiveCurrency(currency);
  };

  const handleAddFirstNewCurrency = (currency: string) => {
    if (checkCurrencyEquality(firstCurrencies, currency)) {
      return setFirstActiveCurrency(currency);
    }

    setFirstCurrencies((prev) => handleChangeCurrenciesList(prev, currency));

    handleChangeFirstActiveCurrency(currency);
  };

  const handleAddSecondNewCurrency = (currency: string) => {
    if (checkCurrencyEquality(secondCurrencies, currency)) {
      return setSecondActiveCurrency(currency);
    }

    setSecondCurrencies((prev) => handleChangeCurrenciesList(prev, currency));

    handleChangeSecondActiveCurrency(currency);
  };

  // Input Changes
  const onChangeFromPrice = (e: React.ChangeEvent<HTMLInputElement & number>) => {
    const value = +e.target.value;
    if (isNaN(value)) return;

    const price = value / rates[firstActiveCurrency];
    const result = price * rates[secondActiveCurrency];
    setFirstInputValue(value);
    setSecondInputValue(result);
  };

  const onChangeToPrice = (e: React.ChangeEvent<HTMLInputElement & number>) => {
    const value = +e.target.value;
    if (isNaN(value)) return;

    const result = (rates[firstActiveCurrency] / rates[secondActiveCurrency]) * value;
    setFirstInputValue(result);
    setSecondInputValue(value);
  };

  // UseEffect for Currency Choosing
  React.useEffect(() => {
    if (!firstInputValue) return;

    const result = (+firstInputValue * rates[secondActiveCurrency]) / rates[firstActiveCurrency];

    return setSecondInputValue(result);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstActiveCurrency, secondActiveCurrency, currenciesData]);

  return (
    <>
      <div className="converter">
        <div className="converter-item">
          <div className="converter-currencies">
            {firstCurrencies.map((currency) => (
              <div
                key={currency}
                className={`converter-currencies__item ${
                  firstActiveCurrency === currency ? 'active' : ''
                }`}
                onClick={() => handleChangeFirstActiveCurrency(currency)}>
                {currency}
              </div>
            ))}
            <CurrenciesPopup
              ratesArray={ratesArray}
              handleAddCurrency={(currency: string) => handleAddFirstNewCurrency(currency)}
            />
          </div>
          <input
            className="converter-input"
            onChange={onChangeFromPrice}
            value={firstInputValue ? Math.round(+firstInputValue * 100) / 100 : ''}
            disabled={!isLoaded}
          />
        </div>
        <div className="converter-item">
          <div className="converter-currencies">
            {secondCurrencies.map((currency) => (
              <div
                key={currency}
                className={`converter-currencies__item ${
                  secondActiveCurrency === currency ? 'active' : ''
                }`}
                onClick={() => handleChangeSecondActiveCurrency(currency)}>
                {currency}
              </div>
            ))}
            <CurrenciesPopup
              ratesArray={ratesArray}
              handleAddCurrency={(currency: string) => handleAddSecondNewCurrency(currency)}
            />
          </div>
          <input
            className="converter-input"
            onChange={onChangeToPrice}
            value={secondInputValue ? Math.round(+secondInputValue * 100) / 100 : ''}
            disabled={!isLoaded}
          />
        </div>
      </div>
    </>
  );
};

export default ConverterBlock;
