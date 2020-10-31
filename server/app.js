const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const messageRoutes = require('./routes/message-routes');

const HttpError = require('./models/http-error');

const app = express();

dotenv.config();
const url = process.env.MONGODB_URL;

app.use(bodyParser.json());


app.use('/api/v1/messages', messageRoutes);


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
  
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log('Running on port 5000');
    });
  })
  .catch(err => {
    console.error(err);
});