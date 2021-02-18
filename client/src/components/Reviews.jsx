import React from 'react';
import StarRatings from './StarRating';

const Reviews = ({ selectedRestaurant }) => {
  const renderReviews = () => {
    const { reviews } = selectedRestaurant;
    return (
      <>
        {reviews?.map(({ name, rating, content, id }) => (
          <div
            key={id}
            className='card text-white bg-primary mb-3 mr-4'
            style={{ maxWidth: '30%', marginRight: '20px' }}
          >
            <div className='card-header d-flex justify-content-between'>
              <span>{name}</span>
              <span>
                <StarRatings rating={rating} />
              </span>
            </div>
            <div className='card-body'>
              <p className='card-text'>{content}</p>
            </div>
          </div>
        ))}
      </>
    );
  };
  return <div className='row row-cols-3 mb-2'>{renderReviews()}</div>;
};

export default Reviews;
