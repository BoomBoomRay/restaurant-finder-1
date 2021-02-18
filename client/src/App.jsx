import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import UpdatePage from './routes/UpdatePage';
import RestaurantDetailsPage from './routes/RestaurantDetailPage';
import Home from './routes/Home';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route
          exact
          path='/restaurants/:id/update'
          component={UpdatePage}
        ></Route>
        <Route
          exact
          path='/restaurants/:id'
          component={RestaurantDetailsPage}
        ></Route>
      </Switch>
    </Router>
  );
};

export default App;
