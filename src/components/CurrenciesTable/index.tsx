import React from 'react';
import { TCurrenciesData } from '../../types';

type TConverterBlockProps = {
  currenciesData: TCurrenciesData;
};

const CurrenciesTable: React.FC<TConverterBlockProps> = ({ currenciesData }) => {
  const [filtredItems, setFiltredItems] = React.useState<any[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');

  const ratesArray = Object.entries(currenciesData.rates);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement & string>) => {
    setSearchValue(e.target.value);
  };

  React.useEffect(() => {
    const filteredItems = ratesArray.filter((rate) =>
      rate[0].toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFiltredItems(filteredItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <>
      <div className="converter">
        <div className="converter-table">
          <input
            className="converter-table__input"
            type="text"
            placeholder="EUR.."
            onChange={handleSearch}
            value={searchValue}
          />
          <div className="converter-table__items">
            {filtredItems.length > 0
              ? filtredItems.map((rate, index) => (
                  <div key={index} className="converter-table__item">
                    <div className="converter-table__item-name">{rate[0]}</div>
                    <span className="converter-table__item-price">{rate[1]}</span>
                  </div>
                ))
              : ratesArray.map((rate, index) => (
                  <div key={index} className="converter-table__item">
                    <div className="converter-table__item-name">{rate[0]}</div>
                    <span className="converter-table__item-price">{rate[1]}</span>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrenciesTable;
