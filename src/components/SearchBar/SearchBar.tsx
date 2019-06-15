import React from 'react';
import { connect } from 'react-redux';

import { AppState } from '../../redux/store'
import { search } from '../../api/search/search';

interface Props {
    search: (language: string) => Promise<void>,
}

class SearchBar extends React.PureComponent<Props> {
    language: HTMLInputElement | null = null;

    onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        // for a larger form I'd use Formik or similar, but feels like overdoing it for a single input field 
        const language = this.language ? this.language.value : '';
        this.props.search(language);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="language" ref={node => this.language = node}/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    search,
};

export default connect(null, mapDispatchToProps)(SearchBar);