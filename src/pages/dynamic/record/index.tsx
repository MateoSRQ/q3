import React from 'react';
import style from './index.module.css'
import log from 'loglevel';
import axios from 'axios';

import Table from '../../../components/table';

interface Props {
}

interface State {
    data: any,
    columns: any
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        log.info('Record:constructor reached');
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            data: null,
            columns: null
        }
    }

    async componentDidMount(): Promise<any> {
        let nodos = await axios.get('http://127.0.0.1:3333/api/fullNodos');
        let examenes = await axios.get('http://127.0.0.1:3333/api/examenes');

        let _examenes = [
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
        for (let examen of examenes.data) {
            _examenes.push({
                title: examen.codigo,
                dataIndex: examen.codigo,
                key: examen.codigo,
                width: 100
            })
        }
        this.setState({
            data: nodos.data,
            columns: _examenes
        });
    }

    handleClick(e: string): void {
        log.info('Record:handleClick reached');
        console.log(e);
    }

    render() {
        log.info('Record:render reached');
        return (
            <div className={[style.component].join(' ')} onClick={() => { this.handleClick('1')}}>
               <Table
                   data={this.state.data}
                   columns={this.state.columns}
               />
            </div>
        );
    }
}

/*
_id: "5df1326e1c866084207e5e4e"
id: 100
sede_id: 1
nombre: "OPTOMETRIA"
area: "65"
color: "CB333B"
codigo: "OPTOMETRIA_65B"
estado: "N"
grupo_nodo: "VISUAL"
*/
