import { SearchAction, SEARCH_SUCCESS, SEARCH_FAILURE } from "./types";

export interface SearchState {
    results: Array<any>,
    error?: Error,
}

const initialState: SearchState = {
    results: [],
    error: undefined,
}

export default function searchReducer(state: SearchState = initialState, action: SearchAction): SearchState {
    switch (action.type) {
        case SEARCH_SUCCESS: {
            return {
                ...state,
                results: action.results,
            }
        }
        case SEARCH_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }
        default:
            return state;
    }
}