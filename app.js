const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env.local' });

// ('mongodb://localhost:27017/yelp-camp');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Campground = require('./models/campground');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Database connected');
});

app.get('/', (req, res) => {
  res.render('home');
});
app.get('/makecampground', async (req, res) => {
  const camp = new Campground({
    title: 'My Backyard',
    description: 'cheap camping!',
  });
  await camp.save();
  res.send(camp);
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
