var compression = require('compression'),
	express = require('express'),
	hbs = require('hbs'),
	app = express();

var site = require('./routes/site'),
	post = require('./routes/post');

const PORT = 8080;

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// GZIP
app.use(compression());

// Serve static files
app.use(express.static('static'));

app.get('/', site.index);

app.get('/posts', post.list);
app.get('/post/:slug', post.view);

var server = app.listen(PORT, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Defend the Web listening at http://%s:%s', host, port);
});
