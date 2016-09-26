/* eslint no-console: 0 */
import http from 'http';
import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router, RouterContext, match } from 'react-router';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import routes, {NotFoundPage} from '../src/routes';
import configureStore from '../src/store/configureStore';
import debug from 'utils/debug';
import color from 'cli-color'; // eslint-disable-line

const release = (process.env.NODE_ENV === 'production');
const port = (parseInt(process.env.PORT, 10) || 3000) - !release;
const app = express();

// Set view engine
app.set('views', './src/server/views');
app.set('view engine', 'ejs');
app.use(compression());
app.use(express.static('./src/assets/favicon'));
app.use(express.static('./build'));

// Route handler that rules them all!
app.get('*', (req, res) => {

  debug(color.cyan('http'), '%s - %s %s', req.ip, req.method, req.url);

  // Do a router match
  match({
    routes: (<Router>{routes}</Router>),
    location: req.url,
  },
  (err, redirect, props) => {

    // Sanity checks
    if (err) {
      return res.status(500).send(err.message);
    } else if (redirect) {
      return res.redirect(302, redirect.pathname + redirect.search);
    } else if (props.components.some(component => component === NotFoundPage)) {
      res.status(404);
    }

    fetchMovies()
			.then((data) => {
				// Create a new Redux store instance
				const store = configureStore({ movies: data });
				// Grab the initial state from our Redux store
				const initialState = JSON.stringify(store.getState());
        const head = Helmet.rewind();
				// Render the component to a string
				const renderedRoot = renderToString(
					<Provider store={store}>
						<RouterContext {...props}/>
					</Provider>
				);

        res.render('index', {
          includeStyles: release,
          includeClient: true,
          renderedRoot,
          initialState,
          title: head.title.toString(),
          meta: head.meta.toString(),
          link: head.link.toString(),
        });
        
			})
			.catch((error) => {
				debug(color.red('Error: '), error);
			});
  });
});

function fetchMovies() {
	return new Promise((resolve, reject) => {
		resolve(require('../src/data/movies0.json'));
		// const requestOptions = {
		//   url: url,
		//   json: true
		// };

		// request.get(requestOptions, (error, response, data) => {
		//   if (error) {
		//     console.log(error);
		//     reject(new Error(error));
		//   } else {
		//     console.log(data);
		//     resolve(data);
		//   }
		// });
	});
}

// Create HTTP Server
const server = http.createServer(app);

// Start
server.listen(port, err => {
  if (err) {
    throw err;
  } else {
    debug(color.cyan('http'), `🚀  started on port ${port}`);
  }
});