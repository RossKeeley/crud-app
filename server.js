// // Requiring express to use in server.js
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
// const app = express()
var app = express();


MongoClient.connect('mongodb+srv://rosskeeley:dude0144Quotes@crud-express-quote-app.yzkex.mongodb.net/crud-express-quote-app?retryWrites=true&w=majority',
{ useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database');
  const db = client.db('crud-express-quote-app');
  const quotesCollection = db.collection('quotes');

  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
  // Allows the server to accept JSON data
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    const cursor = db.collection('quotes').find().toArray()
    .then(results => {
      res.render('index.ejs', { quotes: results });
    })
    .catch(error => console.error(error));
  });

  app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/');
    })
    .catch(error => console.error(error));
  });

  app.put('/quotes', (req, res) => {
    // MongoDB Collections method to find and change one item in the database
    quotesCollection.findOneAndUpdate(
      // Query - filter the collection with key-value pairs
      { name: 'Yoda' },
      // Update - tells mongoDB what to change. Uses mongoDBs update operators like $set, $inc and $push
      // $set operator sets the new values
      {
        $set: {
          name: req.body.name,
          quote: req.body.quote
        }
      },
      // Options - tells mongoDB to define additional options for this update request
      // In this case mongoDB is forced to create the new quote if no quote matching the parameters exists to replace
      // upsert - insert a document if no document can be updated
      {
        upsert: true
      }
    )
    .then(result => {
      res.json('Success');
    })
    .catch(error => console.error(error));
  });

  app.listen(3000, function() {
    console.log('Listening on 3000 babaaaay yahaaaaa');
  });

})
.catch(console.error);


console.log('May Node be with you');
