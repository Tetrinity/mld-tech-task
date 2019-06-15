import React from 'react';
import moment from 'moment';

import Star from '@material-ui/icons/Star'

import styles from './Result.module.scss';

interface Props {
    result: {
        full_name: string,
        description: string,
        created_at: string,
        stargazers_count: number,
        html_url: string,
    }
}

const Result = (props: Props) => (
    <div className={styles.Result}>
        <a href={props.result.html_url}>{props.result.full_name}</a>
        <div>{props.result.description}</div>
        <div className={styles.row}>
            <span id="timestamp">Created: {moment(props.result.created_at).format('Do MMMM YYYY')}</span>
            <span className={styles.stars}>
                <Star />
                <span className={styles.starNum}>{props.result.stargazers_count}</span>
            </span>
        </div>

    </div>
);

export default Result;
