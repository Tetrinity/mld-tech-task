import { SearchAction, SEARCH_SUCCESS, SEARCH_FAILURE, SET_SEARCH_METADATA } from './types';
import { Moment } from 'moment';

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

export function setSearchMetadata(searchTerm: string, searchMoment: Moment): SearchAction {
    return {
        type: SET_SEARCH_METADATA,
        searchTerm,
        searchMoment,
    };
}
