var compression = require('compression'),
	express = require('express'),
	hbs = require('hbs'),
	app = express();

var site = require('./routes/site'),
    course = require('./routes/course');

const PORT = 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// GZIP
app.use(compression());

// Serve static files
app.use(express.static('static'));

app.get('/', site.index);

app.get('/course', course.view);
app.get('/course/:course', course.view);
app.get('/course/:course/:lesson', course.view);

var server = app.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Defend the Web listening at http://%s:%s', host, port);
});
