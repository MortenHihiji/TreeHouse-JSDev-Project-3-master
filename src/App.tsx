import React from 'react';

import { ConverterBlock, CurrenciesTable } from './components';

import useApi from './hooks/useApi';

const App = () => {
  const { isLoaded, currenciesData } = useApi('https://cdn.cur.su/api/latest.json');

  return (
    <div className="container">
      <ConverterBlock currenciesData={currenciesData} isLoaded={isLoaded} />
      <CurrenciesTable currenciesData={currenciesData} isLoaded={isLoaded} />
    </div>
  );
};

export default App;
