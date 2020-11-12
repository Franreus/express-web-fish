const express = require('express');
const port = process.env.PORT || 3000
// express app
const app = express();

// listen for requests
app.listen(port, () => {
	console.log(`Server listening for port ${port}`)
});

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
	console.log('new request made:');
	console.log('host: ', req.hostname);
	console.log('path: ', req.path);
	console.log('method: ', req.method);
	next();
  });
  
  
  app.get('/', (req, res) => {
	res.render('index', { title: 'Fishes List'});
  });
  
  app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
  });
  
  app.get(/^\/fish\/(.*?)\/?$/, (req, res) => {
	  res.render('fish', { title: 'Fish Info',spec: req.params['0']});
	});
  
  // 404 page
  app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
  });