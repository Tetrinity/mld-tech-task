import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import styles from './SearchBar.module.scss';

import { search } from '../../api/search/search';

interface Props {
    search: (language: string) => Promise<void>,
}

interface State {
    language: string,
}

class SearchBar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            language: '',
        };
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            language: event.currentTarget.value,
        });
    }

    onSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        this.props.search(this.state.language);
    }

    // for a larger form I'd use Formik or similar, but feels like overdoing it for a single input field
    render() {
        return (
            <div className={styles.SearchBar}>
                <form onSubmit={this.onSubmit} autoComplete="off">
                    <TextField
                        id="language"
                        label="Language"
                        margin="normal"
                        value={this.state.language}
                        onChange={this.onChange}
                    />
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    search,
};

export { SearchBar as DisconnectedSearchBar };
export default connect(null, mapDispatchToProps)(SearchBar);