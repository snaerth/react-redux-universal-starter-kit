import React from 'react';
import s from './styles';

const PostersList = (props) => {
  return (
        <div>
            {props.movies.map((movie) => {
              return <div className={s.container} key={movie.title}>{movie.title}</div>;
            })}
        </div>
    );
};

PostersList.propTypes = {
  movies: React.PropTypes.array.isRequired,
};


export default PostersList;
