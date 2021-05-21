const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5055;
console.log("user:", process.env.DB_USER);
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9hyks.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("Error",err)
    const serviceCollection = client.db("swimmer").collection("services");
    const reviewCollection = client.db("swimmer").collection("reviews");
    const adminCollection = client.db("swimmer").collection("admins");
    const bookingCollection = client.db("swimmer").collection("bookings");


    app.get("/services", (req, res) => {
        serviceCollection.find().toArray((err, items) => {
          res.send(items);
        });
      });

      //Review
      app.get("/reviews", (req, res) => {
        reviewCollection.find().toArray((err, items) => {
          res.send(items);
        });
      });

      //Admin 
      app.get("/admins", (req, res) => {
        adminCollection.find().toArray((err, items) => {
          res.send(items);
        });
      });

// Booking
app.get('/bookings', (req, res) => {
  bookingCollection.find({})
      .toArray((err, documents) => {
          res.send(documents);
      })
})

    
    app.post("/addservice", (req, res) => {
        const newService = req.body;
        console.log("adding neew service: ", newService);
        serviceCollection
          .insertOne(newService)
          .then((result) => {
            console.log("inserted count", result.insertedCount);
            res.send(result.insertedCount > 0);
          })
          .catch((error) => {
            console.log(error);
          });
      });


      // Review
     

    
    app.post("/addreview", (req, res) => {
        const newReview = req.body;
        console.log("adding neew service: ", newReview);
        reviewCollection
          .insertOne(newReview)
          .then((result) => {
            console.log("inserted count", result.insertedCount);
            res.send(result.insertedCount > 0);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      // Add Admin
     
    
    app.post("/addAdmin", (req, res) => {
        const newAdmin = req.body;
        console.log("adding neew service: ", newAdmin);
        adminCollection
          .insertOne(newAdmin)
          .then((result) => {
            console.log("inserted count", result.insertedCount);
            res.send(result.insertedCount > 0);
          })
          .catch((error) => {
            console.log(error);
          });
      });

      //Add Booking 
    

      app.post('/addBooking', (req, res) => {
        const newBooking = req.body;
        console.log(newBooking);
        bookingCollection.insertOne(newBooking)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
    });

   
});



app.get('/', (req, res) => {
  res.send('Helloooo World!')
})

// port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})