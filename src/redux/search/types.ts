export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'SEARCH_FAILURE';

interface SearchSuccessAction {
    type: typeof SEARCH_SUCCESS,
    results: Array<any>,
}

interface SearchFailureAction {
    type: typeof SEARCH_FAILURE,
    error: Error,
}

export type SearchAction =
    SearchSuccessAction
    | SearchFailureAction;
