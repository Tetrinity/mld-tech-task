import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import moment from 'moment';

import { AppState } from '../../redux/store';
import { searchSuccess, searchFailure } from '../../redux/search/actions';
import { SearchAction } from '../../redux/search/types';

export const buildSearchQuery = (params: {}): string => {
    const parsedParams = Object.entries(params).map(([key, value]) => {
        return `${key}:${value}`;
    });

    return parsedParams.join('+');
}

export const search = (searchTerm: string): ThunkAction<Promise<void>, AppState, void, SearchAction> => async (dispatch, getState) => {
    // in a "real" app you'd want to pass in all of these parameters, but I'm hardcoding them here for the sake of keeping things simple
    const params = {
        q: buildSearchQuery({
            language: searchTerm,
            created: `>${moment().subtract(1, 'month').format('YYYY-MM-DD')}`,
        }),
        sort: 'stars',
        order: 'desc',
        per_page: 3,
    }

    return axios.request<Array<any>>({
        method: 'get',
        url: 'https://api.github.com/search/repositories',
        params,
    }).then(response => {
        dispatch(searchSuccess(response.data))
    }).catch(error => {
        dispatch(searchFailure(error));
    })
}