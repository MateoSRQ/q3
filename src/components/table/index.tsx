import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

import { Table } from 'antd';

interface State {
    loaded: boolean
}

interface Props {
    data: any,
    columns: any,
    y: number
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Table:constructor reached');
        super(props);
        this.state = {
            loaded: false
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        if (
            prevProps.data   != this.props.data &&
            prevProps.columns != this.props.columns
        ) {
            this.setState({
                loaded: true
            });
        }
    }

    render() {
        log.info('Table:render reached');
        let table = null;
        if (this.state.loaded) {
            table = (
                <Table
                    dataSource={this.props.data}
                    columns={this.props.columns}
                    //childrenColumnName='examenes'
                    scroll={{ x: 1500, y: this.props.y }}
                    rowKey='_id'
                    // pagination={false}
                />

            )
        }
        let {data, columns, ...props} = this.props
        return (
            <div className={[style.component].join(' ')} {...props}>
                {table}
            </div>
        );
    }
}



