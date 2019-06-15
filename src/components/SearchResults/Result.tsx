import React from 'react';

interface Props {
    result: {
        full_name: string,
        description: string,
        created_at: string,
        stargazers_count: number,
    }
}

const Result = (props: Props) => (
    <div>
        {props.result.full_name}
    </div>
);

export default Result;
