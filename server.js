var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
User = require('./api/models/user.model'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/bowling',  { useNewUrlParser: true });
mongoose.connect('mongodb://ds157923.mlab.com:57923/heroku_r1pgdkc9',  { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
		);
	next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/user.routes');
routes(app);
app.listen(port);
console.log('Server started on: ' + port);