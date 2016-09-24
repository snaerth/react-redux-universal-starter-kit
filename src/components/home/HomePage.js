import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import MoviePosterList from '../../components/posterlist/PostersList';


class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    clickHandler(event) {
        console.log(event);
    }
    
    render() {
        return (
            <div>
                <h1 onClick={this.clickHandler}>Sýningar í dag</h1>
                <MoviePosterList movies={this.props.movies} />
            </div>
        );
    }
}

HomePage.propTypes = {
    movies: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        movies : state.movies
    };
}

export default connect(mapStateToProps)(HomePage);

