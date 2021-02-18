import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { RestaurantsContextProvider } from './context/RestaurantsContext';

ReactDOM.render(
  <RestaurantsContextProvider>
    <App />
  </RestaurantsContextProvider>,
  document.getElementById('root')
);
