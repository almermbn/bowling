var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
user = require('./api/models/user.model'),
match = require('./api/models/match.model'),
problem = require('./api/models/problem.model'),
event = require('./api/models/event.model'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bowling',  { useNewUrlParser: true });
//mongoose.connect('mongodb://bowlingAdmin:45Wb6VM!@ds157923.mlab.com:57923/heroku_r1pgdkc9',  { useNewUrlParser: true });

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

var userRoutes = require('./api/routes/user.routes');
var matchRoutes = require('./api/routes/match.routes');
var problemRoutes = require('./api/routes/problem.routes');
var eventRoutes = require('./api/routes/event.routes');

userRoutes(app);
matchRoutes(app);
problemRoutes(app);
eventRoutes(app);

app.listen(port);
console.log('Server started on: ' + port);