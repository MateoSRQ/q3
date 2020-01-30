import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

import { Menu, Icon } from 'antd';
import { Row, Col } from 'antd';


interface Props {

}
export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.info('Table:constructor reached');
        super(props);
    }
    render() {
        log.info('Table:render reached');
        return (
            <div className={[style.component].join(' ')} {...this.props}>
                TABLE
            </div>
        );
    }
}



