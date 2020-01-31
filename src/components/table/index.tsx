import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

import { Table } from 'antd';

//_id":"5df1326e1c866084207e5e4e","id":100,"sede_id":1,"nombre":"OPTOMETRIA","user_id":null,"paciente_id":null,"area":"65","color":"CB333B","codigo":"OPTOMETRIA_65B","tiempo_atencion":55,"tiempo_llamada":14,"tiempo_espera":2



interface State {
    loaded: boolean
}

interface Props {
    data: any,
    columns: any
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
                    childrenColumnName='nodos'
                    scroll={{ x: 1500, y: 500 }}/>
            )
        }
        return (
            <div className={[style.component].join(' ')} {...this.props}>
                {table}
            </div>
        );
    }
}



