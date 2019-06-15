import axios from 'axios';

import { buildSearchQuery, search } from './search';
import { searchSuccess, searchFailure } from '../../redux/search/actions';

describe('Search API', () => {
    describe('buildSearchQuery', () => {
        it('should convert a key-value pair into GitHub query parameter syntax', () => {
            // given
            const params = {
                language: 'javascript',
            };

            // when
            const query = buildSearchQuery(params);

            // then
            expect(query).toEqual('language:javascript')
        })

        it('should separate multiple key-value pairs with plus signs', () => {
            // given
            const params = {
                language: 'javascript',
                forks: '>100'
            };

            // when
            const query = buildSearchQuery(params);

            // then
            expect(query).toEqual('language:javascript+forks:>100')
        })

        it('should return an empty string when given an empty object', () => {
            // given
            const params = {};

            // when
            const query = buildSearchQuery(params);

            // then
            expect(query).toEqual('')
        })
    });

    describe('search', () => {
        let spyAxiosGet: jest.SpyInstance;
        let spyDateNow: jest.SpyInstance;

        beforeEach(() => {
            spyAxiosGet = jest.spyOn(axios, 'request');
            spyDateNow = jest.spyOn(Date, 'now').mockImplementation(() => 1550361600000); // 2019-02-17
        });
        afterEach(() => {
            spyAxiosGet.mockRestore();
            spyDateNow.mockRestore();
        })

        it('should make a call to the GitHub API', async () => {
            // given
            const searchTerm = 'javascript';

            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({});

            // when
            await search(searchTerm)(dispatch, getState);

            // then
            expect(spyAxiosGet).toHaveBeenCalledTimes(1);
            const axiosConfig = spyAxiosGet.mock.calls[0][0];
            expect(axiosConfig.method).toEqual('get');
            expect(axiosConfig.url).toContain('api.github.com');
        });

        it('should sort results by number of stars descending', async () => {
            // given
            const searchTerm = 'javascript';

            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({});

            // when
            await search(searchTerm)(dispatch, getState);

            // then
            expect(spyAxiosGet).toHaveBeenCalledTimes(1);
            const axiosConfig = spyAxiosGet.mock.calls[0][0];
            expect(axiosConfig.params.sort).toEqual('stars');
            expect(axiosConfig.params.order).toEqual('desc');
        });

        it('should limit results to only three entries', async () => {
            // given
            const searchTerm = 'javascript';

            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({});

            // when
            await search(searchTerm)(dispatch, getState);

            // then
            expect(spyAxiosGet).toHaveBeenCalledTimes(1);
            const axiosConfig = spyAxiosGet.mock.calls[0][0];
            expect(axiosConfig.params.per_page).toEqual(3);
        });

        it('should build query parameters based on the search term and default settings', async () => {
            // given
            const searchTerm = 'javascript';

            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({});

            // when
            await search(searchTerm)(dispatch, getState);

            // then
            expect(spyAxiosGet).toHaveBeenCalledTimes(1);
            const axiosConfig = spyAxiosGet.mock.calls[0][0];
            expect(axiosConfig.url).toContain('language:javascript');
            expect(axiosConfig.url).toContain('created:>2019-01-17'); // one month before mocked date
        });

        it('should dispatch success if the call succeeded', async () => {
            // given
            const searchTerm = 'javascript';

            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({});

            const mockResults = {
                data: [{ foo: 'bar' }],
            }
            spyAxiosGet.mockResolvedValue(mockResults);

            // when
            await search(searchTerm)(dispatch, getState);

            // then
            expect(dispatch).toHaveBeenCalledWith(searchSuccess(mockResults.data));
        });

        it('should dispatch error if the call failed', async () => {
            // given
            const searchTerm = 'javascript';

            const dispatch = jest.fn();
            const getState = jest.fn().mockReturnValue({});

            const mockError = new Error('something went wrong');
            spyAxiosGet.mockRejectedValue(mockError);

            // when
            await search(searchTerm)(dispatch, getState);

            // then
            expect(dispatch).toHaveBeenCalledWith(searchFailure(mockError));
        });
    });
});
