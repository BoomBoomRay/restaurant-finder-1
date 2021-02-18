import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { validateInput } from '../utils/validators';

const AddRestaurant = () => {
  const { setRestaurants } = useContext(RestaurantsContext);
  const [errors, setErrors] = useState({});

  const [state, setState] = useState({
    name: '',
    location: '',
    price_range: 1,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    setErrors((prevState) => ({ ...prevState, [name]: '' }));
  };

  const addRestaurant = async () => {
    const newRestaurant = {
      name: state.name,
      location: state.location,
      price_range: state.price_range,
    };

    const { valid, errors } = validateInput(newRestaurant);

    if (!valid) {
      setErrors(errors);
      return;
    }

    try {
      const response = await RestaurantFinder.post('/', newRestaurant);
      if (response) {
        setRestaurants((prevState) => [
          ...prevState,
          response.data.data.restaurant,
        ]);
        setState({ name: '', location: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addRestaurant();
  };

  const { name, location, price_range } = state;
  return (
    <div className='container'>
      <form action=''>
        <div className='row'>
          <div className='col-sm'>
            <input
              value={name}
              onChange={handleChange}
              type='text'
              className='form-control'
              name='name'
              placeholder='name'
            />
            <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
              {errors && errors.name}
            </p>
          </div>
          <div className='col-sm'>
            <input
              value={location}
              onChange={handleChange}
              name='location'
              className='form-control'
              type='text'
              placeholder='location'
            />
            <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
              {errors && errors.location}
            </p>
          </div>
          <div className='col-sm'>
            <select
              onChange={handleChange}
              value={price_range}
              name='price_range'
              style={{ width: '100%' }}
              className='custom-select form-control mr-sm-2'
            >
              <option disabled>Price Range</option>
              <option value={1}>$</option>
              <option value={2}>$$</option>
              <option value={3}>$$$</option>
              <option value={4}>$$$$</option>
              <option value={5}>$$$$$</option>
            </select>
            <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
              {errors && errors.price_range}
            </p>
          </div>
          <div className='col-1'>
            <button
              type='submit'
              onClick={onSubmit}
              className='btn btn-primary'
            >
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
