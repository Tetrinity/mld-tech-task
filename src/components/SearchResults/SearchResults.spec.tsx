import React from 'react';
import { shallow } from 'enzyme';
import '../../testHelper/useEnzyme';

import moment from 'moment';

import { DisconnectedSearchResults as SearchResults } from './SearchResults';
import Result from './Result';

describe('SearchResults', () => {
    const defaultSearchState = {
        results: [{ full_name: 'foo' }, { full_name: 'bar' }, { full_name: 'baz' }],
        error: undefined,
        metadata: {
            searchTerm: 'javascript',
            searchMoment: moment(),
        }
    }

    it('should render an error if one exists in the redux state', () => {
        // given
        const results = shallow(<SearchResults search={{
            ...defaultSearchState,
            error: new Error('Something went wrong'),
        }}/>);

        // then
        expect(results.text()).toEqual('Something went wrong');
    });

    it('should render a prompt if there is no error but there are also no results', () => {
        // it is also possible to get this case if the search is successful but has zero matches on GitHub.
        // could handle this by adding a flag to redux state that is set in this event, and checking the flag
        // in the SearchResults component, but keeping things simple for the moment.

        // given
        const results = shallow(<SearchResults search={{
            ...defaultSearchState,
            results: [],
        }} />);

        // then
        expect(results.text()).toEqual('Search for a language to begin.');
    });

    it('should render a Result component for each result in the provided list', () => {
        // given
        const results = shallow(<SearchResults search={defaultSearchState} />);

        // then
        expect(results.find(Result)).toHaveLength(defaultSearchState.results.length);
    });
});
