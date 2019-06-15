import { SearchAction, SEARCH_SUCCESS, SEARCH_FAILURE } from './types';

export function searchSuccess(results: Array<any>): SearchAction {
    return {
        type: SEARCH_SUCCESS,
        results,
    };
}

export function searchFailure(error: Error): SearchAction {
    return {
        type: SEARCH_FAILURE,
        error,
    };
}
