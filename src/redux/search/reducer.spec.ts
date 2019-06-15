import moment from 'moment';
import reducer from './reducer';
import { SEARCH_SUCCESS, SEARCH_FAILURE, SET_SEARCH_METADATA } from './types';

describe('Search Reducer', () => {
    const blankState = {
        results: [],
        metadata: {
            searchTerm: '',
            searchMoment: moment(),
        }
    }

    describe('SEARCH_SUCCESS', () => {
        it('should store the passed results in state', () => {
            // when
            const results = [{ foo: 'bar' }];
            const newState = reducer(blankState, { type: SEARCH_SUCCESS, results })

            // then
            expect(newState.results).toEqual(results);
            expect(newState.error).toBeUndefined();
        })
    });

    describe('SEARCH_FAILURE', () => {
        it('should store the passed error in state', () => {
            // when
            const error = new Error('Something went wrong');
            const newState = reducer(blankState, { type: SEARCH_FAILURE, error })

            // then
            expect(newState.results).toEqual(blankState.results);
            expect(newState.error).toEqual(error);
        })
    });

    describe('SET_SEARCH_METADATA', () => {
        it('should store the passed metadata in state', () => {
            // when
            const searchTerm = 'javascript';
            const searchMoment = moment('2019-04-27');
            const newState = reducer(blankState, { type: SET_SEARCH_METADATA, searchTerm, searchMoment })

            // then
            expect(newState.results).toEqual(blankState.results);
            expect(newState.metadata.searchTerm).toEqual(searchTerm);
            expect(newState.metadata.searchMoment).toEqual(searchMoment);
        })
    });
});
