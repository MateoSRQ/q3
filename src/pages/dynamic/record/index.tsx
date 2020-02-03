import React from 'react';
import style from './index.module.css'
import log from 'loglevel';
import axios from 'axios';
import _ from 'lodash';
import jsonpack from 'jsonpack';

import Table from '../../../components/table';
import {Icon} from 'antd';

interface Props {
}

interface State {
    data: any,
    columns: any,
    y?: number
}

interface Columns {
    title: string,
    dataIndex: string,
    key: string,
    width: number,
    render?: any,
    onCell?: any,
}

export default class Component extends React.Component<Props, State> {
    private tableRef: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        log.info('Record:constructor reached');
        this.handleCellClick = this.handleCellClick.bind(this);
        this.state = {
            data: null,
            columns: null
        }
        this.tableRef = React.createRef();
    }

    async handleCellClick(id: string, codigo: string) {
        console.log(id)
        console.log(codigo)
        try {
            let data = await axios.post(
                'http://127.0.0.1:3333/api/changeNodeStatus',
                {id: id, codigo: codigo}
            );
            let dt = _.clone(this.state.data);
            let d = jsonpack.unpack(data.data)
            dt[_.findIndex(dt, (o: any) => { return (o._id == d._id) }, 0)] = d
            this.setState({
                data: dt
            });
        }
        catch (e) {
            console.log('error')
        }
        // let data = this.state.data;
        // let index = _.findIndex(data, function(o: any) { return o._id == id });
        // let nodo = data[index];
        // let index2 = _.findIndex(nodo, function(o: any) { return o.codigo == codigo })
        // _.remove(nodo.examenes, function(o: any) { return o.codigo == codigo })
        // data[index] = nodo;
        //this.setState({data: data})
    }

    async componentDidMount(): Promise<any> {

        //let nodos = await axios.get('http://127.0.0.1:3333/api/fullNodos?sede=1');
        let nodos = await axios.get('http://127.0.0.1:3333/api/fullNodos?sede=1');
        console.log('REF')

        // nodos.data = _.groupBy(nodos.data, (e: any) => { return e.grupo_nodo });
        // for (let i in nodos.data) {
        //     nodos.data[i]._id = i;
        // }
        // console.log(nodos.data);

        let examenes = await axios.get('http://127.0.0.1:3333/api/examenes');
        let _examenes: Array<Columns> = [
            {
                title: 'Código',
                dataIndex: 'codigo',
                key: 'codigo',
                width: 300
            },
            {
                title: 'Grupo',
                dataIndex: 'grupo_nodo',
                key: 'grupo_nodo',
                width: 300
            },
            {
                title: 'Nombre',
                dataIndex: 'nombre',
                key: 'nombre',
                width: 300
            },
            {
                title: '_ID',
                dataIndex: '_id',
                key: '_id',
                width: 300
            },
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: 300
            },
            {
                title: 'sede_id',
                dataIndex: 'sede_id',
                key: 'sede_id',
                width: 300
            }
        ];
        for (let examen of examenes.data) {
            _examenes.push({
                title: examen.codigo,
                dataIndex: examen.codigo,
                key: examen.codigo,
                width: 100,
                render: (text: any, record: any) => {
                    let cellClass = null;
                    if (_.find(record.examenes, function (o: any) {
                        return o.codigo == examen.codigo
                    }))
                    {
                        cellClass = style.okCell
                        return ({
                            props: {
                                className: [cellClass].join(' '),
                                onClick: () => {  this.handleCellClick(record._id, examen.codigo) }
                            },
                            children: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{fontSize: '24px'}}/>
                        })
                    }
                    else
                    {
                        cellClass = style.nokCell
                        return ({
                            props: {
                                className: [cellClass].join(' '),
                                onClick: () => {  this.handleCellClick(record._id, examen.codigo) }
                            },
                            children: <Icon type="exclamation-circle" theme="twoTone" twoToneColor="#eeeeee" style={{fontSize: '24px'}}/>,
                            })
                    }
                }
            })
        }
        this.setState({
            data: nodos.data,
            columns: _examenes,
            y: this.tableRef?.current?.clientHeight
        });
        console.log('state')
        console.log(this.state.y)
    }

    handleClick(e: string): void {
        log.info('Record:handleClick reached');
        console.log(e);
    }

    render() {
        log.info('Record:render reached');

        let y = (this.state.y)?this.state.y:0


        return (
            <div className={[style.component].join(' ')} >
                <div
                    className={[style.tableContainer].join(' ')}
                    ref={this.tableRef}
                >
                    <Table
                        data={this.state.data}
                        columns={this.state.columns}
                        y={y}
                    />
                </div>
            </div>
        );
    }
}
