import { Moment } from "moment";

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';
export const SET_SEARCH_METADATA = 'SET_SEARCH_METADATA';

interface SearchSuccessAction {
    type: typeof SEARCH_SUCCESS,
    results: Array<any>,
}

interface SearchFailureAction {
    type: typeof SEARCH_FAILURE,
    error: Error,
}

interface SetSearchMetadataAction {
    type: typeof SET_SEARCH_METADATA,
    searchTerm: string,
    searchMoment: Moment,
}

export type SearchAction =
    SearchSuccessAction
    | SearchFailureAction
    | SetSearchMetadataAction;
