const isEmpty = (str) => {
  if (str.trim() === '') return true;
  else return false;
};

exports.validateData = ({ name, location, price_range }) => {
  let errors = {};
  if (isEmpty(name)) {
    errors.name = 'Empty';
  }
  if (isEmpty(location)) {
    errors.location = 'Empty';
  }
  if (isEmpty(price_range)) {
    errors.price_range = 'Select price';
  }
  return {
    errors,
    valid: Object.keys(errors).length > 0 ? false : true,
  };
};
