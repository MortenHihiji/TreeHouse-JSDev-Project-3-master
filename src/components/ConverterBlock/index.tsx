import React from 'react';

import CurrenciesPopup from '../CurrenciesPopup';

import { TCurrenciesData } from '../../types';

type TConverterBlockProps = {
  currenciesData: TCurrenciesData;
  isLoaded: Boolean;
};

const ConverterBlock: React.FC<TConverterBlockProps> = ({ currenciesData, isLoaded }) => {
  const rates = currenciesData.rates;
  const ratesArray = Object.entries(rates);

  const initialCurrencies = ['UAH', 'USD', 'EUR', 'GBP'];

  const [firstCurrencies, setFirstCurrencies] = React.useState(initialCurrencies);
  const [secondCurrencies, setSecondCurrencies] = React.useState(initialCurrencies);

  const [firstActiveCurrency, setFirstActiveCurrency] = React.useState(firstCurrencies[0]);
  const [secondActiveCurrency, setSecondActiveCurrency] = React.useState(secondCurrencies[1]);

  const [firstInputValue, setFirstInputValue] = React.useState<number | string>(1);
  const [secondInputValue, setSecondInputValue] = React.useState<number | string>(0);

  // Currencies choosing logic
  const handleChangeActiveCurrency = (name: string, currency: string) => {
    if (name === 'first') {
      if (secondActiveCurrency === currency) {
        setFirstActiveCurrency(secondActiveCurrency);
        return setSecondActiveCurrency(firstActiveCurrency);
      }
      setFirstActiveCurrency(currency);
    }

    if (name === 'second') {
      if (firstActiveCurrency === currency) {
        setSecondActiveCurrency(firstActiveCurrency);
        return setFirstActiveCurrency(secondActiveCurrency);
      }
      setSecondActiveCurrency(currency);
    }
  };

  const handleAddNewCurrency = (name: string, currency: string) => {
    if (name === 'first') {
      if (firstCurrencies.find((currentCurrency) => currentCurrency === currency)) {
        return setFirstActiveCurrency(currency);
      }

      setFirstActiveCurrency(currency);

      setFirstCurrencies((prev) => [currency, ...prev.slice(0, prev.length - 1)]);

      handleChangeActiveCurrency(name, currency);
    }

    if (name === 'second') {
      if (secondCurrencies.find((currentCurrency) => currentCurrency === currency)) {
        return setSecondActiveCurrency(currency);
      }

      setSecondCurrencies((prev) => [currency, ...prev.slice(0, prev.length - 1)]);

      handleChangeActiveCurrency(name, currency);
    }
  };

  // Input Changes
  const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement & number>) => {
    if (isNaN(+e.target.value)) return;

    if (firstActiveCurrency === 'USD')
      setSecondInputValue(+e.target.value * rates[secondActiveCurrency]);

    setFirstInputValue(e.target.value);
    return setSecondInputValue(
      +e.target.value * (rates[secondActiveCurrency] / rates[firstActiveCurrency]),
    );
  };

  const handleSecondInputChange = (e: React.ChangeEvent<HTMLInputElement & number>) => {
    if (isNaN(+e.target.value)) return;

    if (firstActiveCurrency === 'USD')
      setSecondInputValue(+e.target.value * rates[secondActiveCurrency]);

    setSecondInputValue(e.target.value);
    return setFirstInputValue(
      +e.target.value * (rates[firstActiveCurrency] / rates[secondActiveCurrency]),
    );
  };

  // UseEffect for Currency Choosing
  React.useEffect(() => {
    if (!firstInputValue) return;

    if (firstActiveCurrency === 'USD')
      setSecondInputValue(+firstInputValue * rates[secondActiveCurrency]);

    if (secondActiveCurrency === 'USD')
      setSecondInputValue(+firstInputValue * rates[firstActiveCurrency]);

    return setSecondInputValue(
      (+firstInputValue * rates[secondActiveCurrency]) / rates[firstActiveCurrency],
    );

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
                onClick={() => handleChangeActiveCurrency('first', currency)}>
                {currency}
              </div>
            ))}
            <CurrenciesPopup
              ratesArray={ratesArray}
              handleAddCurrency={(currency: string) => handleAddNewCurrency('first', currency)}
            />
          </div>
          <input
            className="converter-input"
            onChange={handleFirstInputChange}
            value={firstInputValue ? Math.round(+firstInputValue * 100) / 100 : ''}
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
                onClick={() => handleChangeActiveCurrency('second', currency)}>
                {currency}
              </div>
            ))}
            <CurrenciesPopup
              ratesArray={ratesArray}
              handleAddCurrency={(currency: string) => handleAddNewCurrency('second', currency)}
            />
          </div>
          <input
            className="converter-input"
            onChange={handleSecondInputChange}
            value={secondInputValue ? Math.round(+secondInputValue * 100) / 100 : ''}
          />
        </div>
      </div>
    </>
  );
};

export default ConverterBlock;
