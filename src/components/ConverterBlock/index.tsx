import React from 'react';
import { TCurrenciesData } from '../../types';

type TConverterBlockProps = {
  currenciesData: TCurrenciesData;
};

const ConverterBlock: React.FC<TConverterBlockProps> = ({ currenciesData }) => {
  const [firstCurrencies, setFirstCurrencies] = React.useState(['UAH', 'USD', 'EUR', 'GBP']);
  const [secondCurrencies, setSecondCurrencies] = React.useState(['UAH', 'USD', 'EUR', 'GBP']);
  const ratesArray = Object.entries(currenciesData.rates);

  const [firstActiveCurrency, setFirstActiveCurrency] = React.useState(firstCurrencies[0]);
  const [secondActiveCurrency, setSecondActiveCurrency] = React.useState(secondCurrencies[1]);

  const [firstInputValue, setFirstInputValue] = React.useState<number | string>(1);
  const [secondInputValue, setSecondInputValue] = React.useState<number | string>(0);

  const [isFirstPopupActive, setIsFirstPopupActive] = React.useState(false);
  const [isSecondPopupActive, setIsSecondPopupActive] = React.useState(false);

  const handleFirstPopupChange = () => {
    setIsFirstPopupActive(!isFirstPopupActive);
  };

  const handleSecondPopupChange = () => {
    setIsSecondPopupActive(!isSecondPopupActive);
  };

  const handleChangeFirstActiveCurrency = (currency: string) => {
    if (secondActiveCurrency === currency) {
      setFirstActiveCurrency(secondActiveCurrency);
      return setSecondActiveCurrency(firstActiveCurrency);
    }

    setFirstActiveCurrency(currency);
  };

  const handleAddNewFirstCurrency = (currency: string) => {
    setFirstCurrencies((prev) => [currency, ...prev.slice(0, prev.length - 1)]);

    handleChangeFirstActiveCurrency(currency);

    handleFirstPopupChange();
  };

  const handleChangeSecondActiveCurrency = (currency: string) => {
    if (firstActiveCurrency === currency) {
      setSecondActiveCurrency(firstActiveCurrency);
      return setFirstActiveCurrency(secondActiveCurrency);
    }
    setSecondActiveCurrency(currency);
  };

  const handleAddNewSecondCurrency = (currency: string) => {
    setSecondCurrencies((prev) => [currency, ...prev.slice(0, prev.length - 1)]);

    handleChangeSecondActiveCurrency(currency);

    handleSecondPopupChange();
  };

  const handleFirstInputChange = (e: React.ChangeEvent<HTMLInputElement & number>) => {
    if (isNaN(+e.target.value)) {
      return;
    }

    setFirstInputValue(e.target.value);

    if (firstActiveCurrency === 'USD') {
      const rate = currenciesData.rates[secondActiveCurrency];
      return setSecondInputValue(+e.target.value * rate);
    }

    if (secondActiveCurrency === 'USD') {
      const rate = currenciesData.rates[firstActiveCurrency];
      return setSecondInputValue(+e.target.value / rate);
    }

    const firstCurrencyRate = currenciesData.rates[firstActiveCurrency];
    const secondCurrencyRate = currenciesData.rates[secondActiveCurrency];

    const rate = secondCurrencyRate / firstCurrencyRate;

    return setSecondInputValue(+e.target.value * rate);
  };

  const handleSecondInputCahnge = (e: React.ChangeEvent<HTMLInputElement & number>) => {
    if (isNaN(+e.target.value)) {
      return;
    }

    setSecondInputValue(e.target.value);

    if (firstActiveCurrency === 'USD') {
      const rate = currenciesData.rates[secondActiveCurrency];
      return setFirstInputValue(+e.target.value / rate);
    }

    if (secondActiveCurrency === 'USD') {
      const rate = currenciesData.rates[firstActiveCurrency];
      return setFirstInputValue(+e.target.value * rate);
    }

    const firstCurrencyRate = currenciesData.rates[firstActiveCurrency];
    const secondCurrencyRate = currenciesData.rates[secondActiveCurrency];

    const rate = firstCurrencyRate / secondCurrencyRate;

    return setFirstInputValue(+e.target.value * rate);
  };

  React.useEffect(() => {
    if (!firstInputValue) return;

    if (firstActiveCurrency === 'USD') {
      const rate = currenciesData.rates[secondActiveCurrency];
      return setSecondInputValue(+firstInputValue * rate);
    }

    if (secondActiveCurrency === 'USD') {
      const rate = currenciesData.rates[firstActiveCurrency];
      return setSecondInputValue(+firstInputValue / rate);
    }

    const firstCurrencyRate = currenciesData.rates[firstActiveCurrency];
    const secondCurrencyRate = currenciesData.rates[secondActiveCurrency];

    const rate = secondCurrencyRate / firstCurrencyRate;

    return setSecondInputValue(+firstInputValue * rate);
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
            <div className="converter-currencies__item button" onClick={handleFirstPopupChange}>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0L7 5L12 0L14 1L7 8L0 1L2 0Z" fill="black" />
              </svg>
            </div>
            {isFirstPopupActive ? (
              <div className="converter-currencies__popup">
                <ul>
                  {ratesArray.map((rate, index) => (
                    <li key={index} onClick={() => handleAddNewFirstCurrency(rate[0])}>
                      {rate[0]}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ''
            )}
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
                onClick={() => handleAddNewSecondCurrency(currency)}>
                {currency}
              </div>
            ))}
            <div className="converter-currencies__item button" onClick={handleSecondPopupChange}>
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0L7 5L12 0L14 1L7 8L0 1L2 0Z" fill="black" />
              </svg>
            </div>
            {isSecondPopupActive ? (
              <div className="converter-currencies__popup">
                <ul>
                  {ratesArray.map((rate, index) => (
                    <li key={index} onClick={() => handleAddNewSecondCurrency(rate[0])}>
                      {rate[0]}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ''
            )}
          </div>
          <input
            className="converter-input"
            onChange={handleSecondInputCahnge}
            value={secondInputValue ? Math.round(+secondInputValue * 100) / 100 : ''}
          />
        </div>
      </div>
    </>
  );
};

export default ConverterBlock;
