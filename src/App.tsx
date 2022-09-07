import React from 'react';
import axios from 'axios';

import { ConverterBlock, CurrenciesTable } from './components';
import { TCurrenciesData } from './types';

const defaultData = {
  lastupdate: '',
  rates: {},
};

const App = () => {
  const [currenciesData, setCurrenciesData] = React.useState<TCurrenciesData>(defaultData);

  React.useEffect(() => {
    setInterval(() => {});
    axios('https://cdn.cur.su/api/latest.json')
      .then((data) => {
        setCurrenciesData(data.data);
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <div className="container">
      <ConverterBlock currenciesData={currenciesData} />
      <CurrenciesTable currenciesData={currenciesData} />
    </div>
  );
};

export default App;
