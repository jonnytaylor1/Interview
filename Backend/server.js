let express = require('express');
const mongoose = require('mongoose');
let cors = require('cors');
const loansRouter = require('./Routes/loans');
let app = express();


app.use(cors({ origin: "http://localhost:3000", credentials: true}))
app.disable('x-powered-by'); //Hides info that the app is powered by express
app.use(express.urlencoded({ extended: true })); //Parses url-encoded bodies. Extended: true - The values of the object body can be of any type.
app.use(express.json()); //Parses JSON bodies
const MONGO_URI;
const PORT = 5000;



// Allows cross domain requests, credentials true is needed for the sessions to work
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('Connected to MongoDB');

})


//Routes
app.use('/loans', loansRouter);

//Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({error: {status: err.status || 500, message: err.message}})
});

//Connect to server
app.listen(PORT, () => console.log('Listening on port ' + PORT));
