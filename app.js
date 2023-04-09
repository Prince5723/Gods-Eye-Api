const express = require('express');
const connectToMongo = require('./db');

const app = express();

//connecting to db
connectToMongo();

//importing routes
app.use(express.json());
app.use('/auth', require('./routes/auth'));



//listening on port 5000
const port = 5000;
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})




