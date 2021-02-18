import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import StarRatings from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const RestaurantDetailPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='container'>
      <h1 className='text-center display-1'>
        {selectedRestaurant?.restaurant?.name.toUpperCase()}
      </h1>
      <div className='text-center'>
        <StarRatings
          rating={parseInt(selectedRestaurant?.restaurant?.average_rating)}
        />{' '}
        (
        {!selectedRestaurant?.restaurant?.review_count
          ? '0 Reviews'
          : selectedRestaurant?.restaurant?.review_count}
        )
      </div>
      <button onClick={() => history.push('/')} className='btn btn-warning'>
        Back
      </button>
      {
        <>
          <div className='mt-3'>
            <Reviews selectedRestaurant={selectedRestaurant} />
          </div>
          <AddReview />
        </>
      }
    </div>
  );
};

export default RestaurantDetailPage;
