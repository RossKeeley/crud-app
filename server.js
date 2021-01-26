// // Requiring express to use in server.js
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
// const app = express()
var app = express();
//
// MongoClient.connect('mongodb+srv://rosskeeley:dude0144Quotes@crud-express-quote-app.yzkex.mongodb.net/crud-express-quote-app?retryWrites=true&w=majority', { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('crud-express-quote-app');
//     const quotesCollection = db.collection('quotes')
//
//   app.use(bodyParser.urlencoded({
//     extended: true
//   }))
//   app.use(bodyParser.json())
//   app.use(express.static('public'))

  MongoClient.connect('mongodb+srv://rosskeeley:dude0144Quotes@crud-express-quote-app.yzkex.mongodb.net/crud-express-quote-app?retryWrites=true&w=majority',
  { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('crud-express-quote-app');
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs');

    app.use(bodyParser.urlencoded({ extended: true }));

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

    app.listen(3000, function() {
      console.log('Listening on 3000 babaaaay yahaaaaa');
    });

  })
  .catch(console.error);


//   app.post('/quotes', (req, res) => {
//     quotesCollection.insertOne(req.body)
//       .then(result => {
//         console.log(result)
//       })
//       .catch(error => console.error(error))
//   });




// }).catch(console.error)



console.log('May Node be with you');