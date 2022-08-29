const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(bodyParser.json())


app.listen(3000, function() {
    console.log('listening on 3000')
  })


MongoClient.connect('mongodb+srv://aaron2147m:hello@cluster0.ktdc8cl.mongodb.net/?retryWrites=true&w=majority',{
useUnifiedTopology: true })
  .then(client => {
   console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    
    

    app.get('/',(req, res) => {
    db.collection('quotes').find().toArray()
        .then(results => {
        res.render('index.ejs', { quotes: results})
        
        })
 })

    app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/')
        
        console.log(result)
        })
    })
    
    app.put('/quotes', (req, res) => {
        quotesCollection.findOneAndUpdate(
            { name: 'yoda' },
            {
              $set: {
                name: req.body.name,
                quote: req.body.quote
              }
            },
            {
              upsert: true
            }

        )
        .then(result => {
            res.json('Success')
           })
          .catch(error => console.error(error))
        
    })
      
    app.delete('/quotes', (req, res) => {
        quotesCollection.deleteOne(
            {name: 'Darth Vader'},
            { name: req.body.name }
          )
          .then(result => {
            if (result.deletedCount === 0) {
              return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
          })
          .catch(error => console.error(error))
    
    })
    













})
.catch(error =>console.error(error))
   




