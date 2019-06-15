import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../redux/store'
import { SearchState } from '../../redux/search/reducer';

interface Props {
    search: SearchState,
}

class SearchResults extends React.PureComponent<Props> {
    render() {
        return (
            <div>
                Results:
                {JSON.stringify(this.props.search.results)}
            </div>
        );
    }
}

const mapStateToProps = ({ search }: AppState) => ({
    search,
});

export default connect(mapStateToProps, null)(SearchResults);