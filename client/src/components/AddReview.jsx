import React, { useState, useContext } from 'react';
import { validateInputReview } from '../utils/validators';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddReview = () => {
  const { setSelectedRestaurant } = useContext(RestaurantsContext);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    name: '',
    review: '',
    rating: 1,
  });

  const handleChange = (e) => {
    const { value, id } = e.target;
    setState({ ...state, [id]: value });
    setErrors((prevState) => ({ ...prevState, [id]: '' }));
  };

  const addReview = async () => {
    const newReview = {
      name: state.name,
      content: state.review,
      rating: state.rating,
    };
    const { errors, valid } = validateInputReview(newReview);
    if (!valid) {
      setErrors(errors);
      return;
    }
    try {
      const response = await RestaurantFinder.post(
        `/${id}/addReview`,
        newReview
      );
      if (response) {
        setSelectedRestaurant((prevState) => ({
          ...prevState,
          reviews: response.data.data.reviews,
        }));
        setState({ name: '', review: '', rating: 1 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addReview();
  };

  return (
    <div className='mb-2'>
      <form action=''>
        <div className='row'>
          <div className='col-8'>
            <label htmlFor='name'>Name</label>
            <input
              onChange={handleChange}
              value={state.name}
              id='name'
              placeholder='name'
              type='text'
              className='form-control'
            />
            <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
              {errors && errors.name}
            </p>
          </div>
          <div className='col md-4'>
            <label htmlFor='rating'>Rating</label>
            <select
              onChange={handleChange}
              value={state.rating}
              id='rating'
              style={{ width: '100%' }}
              className='custom-select mr-sm-2 form-control'
            >
              <option disabled>Rating</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
            </select>
            <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
              {errors && errors.rating}
            </p>
          </div>
        </div>
        <div className='form-group'>
          <label htmlFor='Review'>Review</label>
          <textarea
            value={state.review}
            onChange={handleChange}
            id='review'
            className='form-control'
          ></textarea>
          <p style={{ color: 'red', fontSize: '10px', textAlign: 'center' }}>
            {errors && errors.review}
          </p>
        </div>
        <button
          onClick={onSubmit}
          type='submit'
          className='btn btn-primary mt-3'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;
