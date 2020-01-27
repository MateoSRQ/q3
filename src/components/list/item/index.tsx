import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

interface Props {
    data: any
}

interface State {
}

export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.info('ListItem:constructor reached');
        super(props);
    }
    render() {
        log.info('ListItem:render reached');
        return (
            <div className={[style.component].join(' ')}>DATA</div>
        );
    }
}



