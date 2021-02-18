import React, { useContext, useEffect } from 'react';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useHistory } from 'react-router-dom';
import StarRatings from '../components/StarRating';

const RestaurantList = () => {
  const history = useHistory();
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  const fetchData = async () => {
    try {
      const response = await RestaurantFinder.get('/');
      setRestaurants(response.data.data.restaurants);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRestaurant = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await RestaurantFinder.delete(`/${id}`);
      if (response) {
        const existingRestaurants = [...restaurants];
        const filtered = existingRestaurants.filter((i) => i.id !== id);
        setRestaurants(filtered);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const routeToUpdateComponent = (e, id) => {
    e.stopPropagation();
    history.push(`/restaurants/${id}/update`);
  };

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderTable = () => {
    return (
      <>
        {restaurants?.map(
          (
            { name, location, price_range, id, average_rating, review_count },
            ind
          ) => {
            return (
              <tr key={ind} onClick={() => handleRestaurantSelect(id)}>
                <th scope='row'>{name}</th>
                <td>{location}</td>
                <td>{'$'.repeat(price_range)}</td>
                <td>
                  <StarRatings rating={average_rating} />
                  <span className='text-warning'>
                    ({!review_count ? '0 reviews' : review_count})
                  </span>
                </td>
                <td>
                  <button
                    onClick={(e) => routeToUpdateComponent(e, id)}
                    className='btn btn-warning'
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={(e) => deleteRestaurant(e, id)}
                    className='btn btn-danger'
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          }
        )}
      </>
    );
  };
  return (
    <div className='container mt-3'>
      <table className='table table-hover' style={{ backgroundColor: 'gray' }}>
        <thead>
          <tr className='bg-primary'>
            <th scope='col'>Restaurant</th>
            <th scope='col'>Location</th>
            <th scope='col'>Price range</th>
            <th scope='col'>Rating</th>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
