import { SearchAction, SEARCH_SUCCESS, SEARCH_FAILURE, SET_SEARCH_METADATA } from "./types";
import moment, { Moment } from "moment";

export interface SearchState {
    results: Array<any>,
    error?: Error,
    metadata: {
        searchTerm: string,
        searchMoment: Moment,
    }
}

const initialState: SearchState = {
    results: [],
    error: undefined,
    metadata: {
        searchTerm: '',
        searchMoment: moment(),
    }
}

export default function searchReducer(state: SearchState = initialState, action: SearchAction): SearchState {
    switch (action.type) {
        case SEARCH_SUCCESS: {
            return {
                ...state,
                results: action.results,
                error: undefined,
            }
        }
        case SEARCH_FAILURE: {
            return {
                ...state,
                error: action.error,
            }
        }
        case SET_SEARCH_METADATA: {
            return {
                ...state,
                metadata: {
                    searchTerm: action.searchTerm,
                    searchMoment: action.searchMoment,
                },
            }
        }
        default:
            return state;
    }
}