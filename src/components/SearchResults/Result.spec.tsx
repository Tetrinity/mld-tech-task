import React from 'react';
import { shallow } from 'enzyme';
import '../../testHelper/useEnzyme';

import Result from './Result';

describe('Result', () => {
    it('should format the provided date', () => {
        // given
        const mockResult = {
            full_name: 'Test Result',
            description: 'A result used for testing',
            created_at: '2019-05-22T00:08:44Z',
            stargazers_count: 577,
            html_url: 'www.example.com/test-result',
        };
        const result = shallow(<Result result={mockResult}/>);

        // then
        expect(result.find(`#timestamp`).text()).toEqual('Created: 22nd May 2019');
    });
});
