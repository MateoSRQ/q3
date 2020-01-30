import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

import { Table } from 'antd';

//_id":"5df1326e1c866084207e5e4e","id":100,"sede_id":1,"nombre":"OPTOMETRIA","user_id":null,"paciente_id":null,"area":"65","color":"CB333B","codigo":"OPTOMETRIA_65B","tiempo_atencion":55,"tiempo_llamada":14,"tiempo_espera":2


const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 500
    },
    {
        title: 'sede_id',
        dataIndex: 'sede_id',
        key: 'sede_id',
        width: 500
    },
    {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        width: 500
    },
];

interface Props {
    data: any
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
                <Table dataSource={this.props.data} columns={columns} childrenColumnName='nodos'scroll={{ x: 1500, y: 300 }}/>
            </div>
        );
    }
}



