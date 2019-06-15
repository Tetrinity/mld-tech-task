import React from 'react';
import { shallow } from 'enzyme';
import '../../testHelper/useEnzyme';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { DisconnectedSearchBar as SearchBar } from './SearchBar';

describe('SearchBar', () => {
    it('should render a basic form', () => {
        // given
        const searchBar = shallow(<SearchBar search={jest.fn()}/>);

        // then
        expect(searchBar.find(Button).exists).toBeTruthy();
        expect(searchBar.find(TextField).exists).toBeTruthy();
    });

    it('should call the provided search function when the form is submitted', () => {
        // given
        const search = jest.fn();
        const searchBar = shallow(<SearchBar search={search} />);

        searchBar.setState({
            language: 'javascript',
        });

        // when
        const mockEvent = { preventDefault: jest.fn() } as unknown as React.FormEvent<HTMLInputElement>;
        searchBar.find('form').prop('onSubmit')!(mockEvent);

        // then
        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(search).toHaveBeenCalledTimes(1);
        expect(search).toHaveBeenCalledWith('javascript');
    });
});
