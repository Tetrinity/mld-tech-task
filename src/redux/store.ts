import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';

import searchReducer from './search/reducer';

const rootReducer = combineReducers({
    search: searchReducer,
});
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState?: {}): Store {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk))
    );
}