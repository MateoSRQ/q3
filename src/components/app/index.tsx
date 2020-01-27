import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

import Loader from '../loader'

import Main from '../../pages/main';

log.setLevel('warn');

interface Props {}
export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.info('App:constructor reached');
        super(props);
    }
    render() {
        log.info('App:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <Loader size={96} auto={2000}>
                    <Main />
                </Loader>
            </div>
        );
    }
}



