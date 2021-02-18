require('dotenv').config();
const cors = require('cors');
const db = require('./db');
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { validateData } = require('./utils/validators');
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
}

//Get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {
  try {
    const query = {
      text: 'SELECT * FROM restaurants;',
    };
    const results = await db.query(query);
    const resultsData = await db.query(
      'SELECT * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;'
    );
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: {
        restaurants: resultsData.rows,
        restaurants: results.rows,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = {
      name: 'fetch-restaurant',
      text:
        'SELECT * from restaurants left join (select restaurant_id, COUNT(*) as review_count, TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;',
      values: [id],
    };
    const queryReview = {
      text: 'SELECT * from reviews WHERE restaurant_id = $1',
      values: [id],
    };

    const results = await db.query(query);
    const reviews = await db.query(queryReview);

    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data: { restaurant: results.rows[0], reviews: reviews.rows },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

//Create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;

  // const { valid, errors } = validateData({ name, location, price_range });
  // if (!valid) return res.status(400).json(errors);

  try {
    const query = {
      text:
        'INSERT INTO restaurants(name, location, price_range) VALUES($1, $2, $3) returning *',
      values: [name, location, price_range],
    };
    const results = await db.query(query);
    res.status(200).json({
      status: 'Success',
      results: results.rowCount,
      data: { restaurant: results.rows[0] },
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update restaurants
app.put('/api/v1/restaurants/:id', async (req, res) => {
  const name = req.body.name;
  const location = req.body.location;
  const price_range = req.body.price_range;
  const id = req.params.id;
  try {
    const query = {
      text:
        'UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 returning *',
      values: [name, location, price_range, id],
    };
    const results = await db.query(query);
    if (results) {
      res.status(200).json({
        status: 'Success',
        data: { restaurant: results.rows[0] },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Add a review
app.post('/api/v1/restaurants/:id/addReview', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const content = req.body.content;
  const rating = req.body.rating;

  try {
    const query = {
      text:
        'INSERT INTO reviews(name, restaurant_id, content, rating) VALUES($2, $1, $3, $4) returning *',
      values: [id, name, content, rating],
    };
    const queryRestaurant = {
      text: 'SELECT * from restaurants WHERE id = $1',
      values: [id],
    };
    const queryReview = {
      text: 'SELECT * from reviews WHERE restaurant_id = $1',
      values: [id],
    };

    const response = await db.query(query);
    const selectedRest = await db.query(queryRestaurant);
    const allReviews = await db.query(queryReview);
    if (response) {
      res.status(200).json({
        status: 'Success',
        createdReview: { review: response.rows[0] },
        data: {
          restaurants: selectedRest.rows[0],
          reviews: allReviews.rows,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Delete a restaurant
app.delete('/api/v1/restaurants/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const query = {
      text: 'DELETE from restaurants where id = $1',
      values: [id],
    };
    const results = await db.query(query);
    if (results) {
      res.status(200).json({ status: 'Successfully Deleted!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
