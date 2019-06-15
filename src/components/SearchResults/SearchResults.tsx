import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import styles from './SearchResults.module.scss';

import { AppState } from '../../redux/store'
import { SearchState } from '../../redux/search/reducer';
import Result from './Result';

interface Props {
    search: SearchState,
}

class SearchResults extends React.PureComponent<Props> {
    render() {
        const { results, metadata, error } = this.props.search;

        if (error) {
            return (
                <div className={styles.SearchResults}>
                    {error.message}
                </div>
            )
        }

        if (results.length === 0) {
            return (
                <div className={styles.SearchResults}>
                    Search for a language to begin.
                </div>
            );
        }

        return (
            <div className={styles.SearchResults}>
                <h1 className={styles.header}>Most Stars: '{metadata.searchTerm}'</h1>
                <span className={styles.repoTag}>Repos created since {moment(metadata.searchMoment).subtract(1, 'month').format('Do MMMM, YYYY')}</span>
                Results:

                {
                    results.map(result => <Result key={result.full_name} result={result}/>)
                }
            </div>
        );
    }
}

const mapStateToProps = ({ search }: AppState) => ({
    search,
});

export default connect(mapStateToProps, null)(SearchResults);