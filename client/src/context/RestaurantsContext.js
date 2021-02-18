import React, { useState, createContext } from 'react';
const RestaurantsContext = createContext();

const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        setRestaurants,
        selectedRestaurant,
        setSelectedRestaurant,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export { RestaurantsContextProvider, RestaurantsContext };
