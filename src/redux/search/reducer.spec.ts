import reducer from './reducer';
import { SEARCH_SUCCESS, SEARCH_FAILURE } from './types';

describe('Search Reducer', () => {
    describe('SEARCH_SUCCESS', () => {
        it('should store the passed results in state', () => {
            // given
            const oldState = {
                results: [],
            };

            // when
            const results = [{ foo: 'bar' }];
            const newState = reducer(oldState, { type: SEARCH_SUCCESS, results })

            // then
            expect(newState.results).toEqual(results);
            expect(newState.error).toBeUndefined();
        })
    });

    describe('SEARCH_FAILURE', () => {
        it('should store the passed error in state', () => {
            // given
            const oldState = {
                results: [],
            };

            // when
            const error = new Error('Something went wrong');
            const newState = reducer(oldState, { type: SEARCH_FAILURE, error })

            // then
            expect(newState.results).toEqual(oldState.results);
            expect(newState.error).toEqual(error);
        })
    });
});
