export const validateInput = ({ name, location, price_range }) => {
  let errors = {};
  if (name.trim() === '') {
    errors.name = 'Empty';
  }
  if (location.trim() === '') {
    errors.location = 'Empty';
  }
  if (price_range === 0) {
    errors.price_range = 'Select one';
  }

  return {
    errors,
    valid: Object.values(errors).length === 0 ? true : false,
  };
};

export const validateInputReview = ({ name, content, rating }) => {
  let errors = {};
  if (name.trim() === '') {
    errors.name = 'Empty';
  }
  if (content.trim() === '') {
    errors.review = 'Empty';
  }
  if (rating === 0) {
    errors.rating = 'Select one';
  }

  return {
    errors,
    valid: Object.values(errors).length === 0 ? true : false,
  };
};
