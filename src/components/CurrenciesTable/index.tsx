import React from 'react';
import ContentLoader from 'react-content-loader';
import { TCurrenciesData } from '../../types';

type TConverterBlockProps = {
  currenciesData: TCurrenciesData;
  isLoaded: Boolean;
};

const CurrenciesTable: React.FC<TConverterBlockProps> = ({ currenciesData, isLoaded }) => {
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
            {!isLoaded
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <ContentLoader
                      className="converter-table__loading"
                      key={index}
                      speed={2}
                      width={205}
                      height={30}
                      viewBox="0 0 205 30"
                      backgroundColor="#f3f3f3"
                      foregroundColor="#ecebeb">
                      <rect x="0" y="0" rx="0" ry="0" width="55" height="30" />
                      <rect x="56" y="0" rx="0" ry="0" width="150" height="30" />
                    </ContentLoader>
                  ))
              : filtredItems.length > 0
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
