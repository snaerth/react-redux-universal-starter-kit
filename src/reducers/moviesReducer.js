export default function moviesReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_MOVIE':
            return [...state,
                Object.assign({}, action.movies)
            ];
        default: {
            return state;
        }
    }
}