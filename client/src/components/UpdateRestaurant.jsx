import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { validateInput } from '../utils/validators';

const UpdateRestaurant = () => {
  const history = useHistory();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: '',
    location: '',
    price_range: 0,
  });

  useEffect(() => {
    let subscribed = true;
    const fetchSelectedRestaurant = async () => {
      const results = await RestaurantFinder.get(`/${id}`);
      setState({
        name: results.data.data.restaurant.name,
        location: results.data.data.restaurant.location,
        price_range: results.data.data.restaurant.price_range,
      });
    };
    fetchSelectedRestaurant();
    return () => (subscribed = false);
  }, []);

  const handleChange = (e) => {
    const { value, id } = e.target;
    setState((prevState) => ({ ...prevState, [id]: value }));
    setErrors((prevState) => ({ ...prevState, [id]: '' }));
  };

  const upDateRestaurant = async () => {
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
      const response = await RestaurantFinder.put(`/${id}`, newRestaurant);
      if (response) {
        history.push('/');
        setState({ name: '', location: '' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    upDateRestaurant();
  };

  const { name, location, price_range } = state;
  return (
    <div>
      <form action=''>
        <button
          onClick={() => history.push('/')}
          className='btn btn-warning mb-4'
        >
          Back
        </button>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={handleChange}
            id='name'
            className='form-control'
            type='text'
          ></input>
          <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
            {errors && errors.name}
          </p>
        </div>
        <div className='form-group mb-3'>
          <label htmlFor='location'>Location</label>
          <input
            onChange={handleChange}
            value={location}
            id='location'
            className='form-control'
            type='text'
          ></input>
          <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
            {errors && errors.location}
          </p>
        </div>
        <select
          onChange={handleChange}
          value={price_range}
          id='price_range'
          name='price_range'
          style={{ width: '100%' }}
          className='custom-select my-1 mr-sm-2'
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
        <button onClick={onSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};
export default UpdateRestaurant;
