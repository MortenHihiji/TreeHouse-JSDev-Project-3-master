import React from 'react';
import axios from 'axios';

import { TCurrenciesData } from '../types';

const defaultData = {
  lastupdate: '',
  rates: {},
};

const useApi = (url: string) => {
  const [currenciesData, setCurrenciesData] = React.useState<TCurrenciesData>(defaultData);

  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  const fetchData = () => {
    axios(url)
      .then((data) => {
        setCurrenciesData(data.data);
        setIsLoaded(true);
      })
      .catch((err) => alert(err));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return { isLoaded, currenciesData };
};

export default useApi;
