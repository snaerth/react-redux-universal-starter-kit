import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import MoviePage from './components/movie/MoviePage';
import NotFoundPage from './components/notfound/NotFoundPage';

export {
  NotFoundPage,
};

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="movie" component={MoviePage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
