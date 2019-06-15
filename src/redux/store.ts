import { createStore, combineReducers, applyMiddleware, compose, Store } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({

});
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState?: {}): Store {
    return createStore(
        rootReducer,
        initialState,
        compose(applyMiddleware(thunk))
    );
}