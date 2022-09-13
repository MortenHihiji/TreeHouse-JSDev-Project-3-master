import React from 'react';

type TCurrenciesPopup = {
  ratesArray: any[];
  handleAddCurrency: (currency: string) => void;
};

const CurrenciesPopup = ({ ratesArray, handleAddCurrency }: TCurrenciesPopup) => {
  const [isPopupActive, setIsPopupActive] = React.useState(false);

  const handlePopupActive = () => setIsPopupActive(!isPopupActive);

  const onSelectCurrency = (currency: string) => {
    handleAddCurrency(currency);
    handlePopupActive();
  };

  return (
    <>
      <div className="converter-currencies__item button" onClick={handlePopupActive}>
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M2 0L7 5L12 0L14 1L7 8L0 1L2 0Z" fill="black" />
        </svg>
      </div>
      {isPopupActive ? (
        <div className="converter-currencies__popup">
          <ul>
            {ratesArray.map((rate, index) => (
              <li key={index} onClick={() => onSelectCurrency(rate[0])}>
                {rate[0]}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default CurrenciesPopup;
