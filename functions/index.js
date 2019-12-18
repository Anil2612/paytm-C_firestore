const functions = require('firebase-functions');
var app = require('express')();
var bodyparser = require('body-parser');
app.use(bodyparser.json());

//firestore
var admin = require("firebase-admin");
var serviceAccount = require("./config/key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-node-1e514.firebaseio.com"
});

//Using Middleware
var middleware=require('./Controller/middleware/database')
app.use(middleware);

//Routes
var routes=require('./Router/routes');
app.use('/api',routes);
app.post('*', (req,res) => {
    res.status(404).send({message : 'Invalid Api Please check Api !!!!!!!!!!'})
})
app.all('/', (req,res) => {
    res.status(200).send({message : 'Api is Live !!!!!!'})
})

//Listening to port
const port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening tp port...');

exports["firebaseNode"] = functions.https.onRequest(app);