const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const PORT = process.env.PORT || 5000
const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/books";
mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Mongo Db connected'))
.catch(err => console.log(err));

app.listen(PORT, () =>{
    console.log(`now listening on ${PORT}`)
})