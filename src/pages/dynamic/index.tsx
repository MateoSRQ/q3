import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import Split from "react-split-pane";
import Scrollable from "react-custom-scrollbars";
import Item from "./item";
import withDataProvider from "../../components/dataprovider";
import List from "../../components/list";
import Record from './record';
import {Form, Input} from '../../components/form';

import { Modal, Button, Radio, Icon } from 'antd';

let DataList = withDataProvider(List);

interface State {
    modalVisible: boolean
    data: any,
}

interface Props {
}


export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Main:constructor reached');
        super(props);
        this.newRecord = this.newRecord.bind(this);
        this.modalOk = this.modalOk.bind(this);
        this.modalCancel = this.modalCancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            modalVisible: false,
            data: {
                codigo: 'Codigo',
                nombre: 'Nombre'
            }
        };
    }

    handleChange(e: any) {
        console.log('----');
        let data = this.state.data;
        data[e.index] = e.value

        console.log(e);
        this.setState({
            data: data
        })
    }

    newRecord(): void {
        log.info('Main:newRecord reached');
        console.log('newRecord')
        this.setState({modalVisible: true} );
    }

    modalOk(): void {
        log.info('Main:modalOk reached');
        console.log('ok')
        //this.setState({modalVisible: false} );
    }

    modalCancel(): void {
        log.info('Main:modalCancel reached');
        console.log('cancel')
        this.setState({modalVisible: false} );
    }

    render() {
        log.info('Main:render reached');
        return (
            <React.Fragment>
                <Split  size={320} minSize={50} maxSize={320}  className={[style.center].join(' ')}>
                    <div className={[style.middle].join(' ')}>
                        <div className={[style.middleHeader].join(' ')}>
                            <Button type="primary" style={{width: '200px'}} onClick={this.newRecord}>Nuevo registro</Button>
                        </div>
                        <Scrollable className={[style.middleBody].join(' ')}>
                            <DataList
                                url='http://127.0.0.1:3333/api/nodos'
                                item={Item}
                                keyId='_id'
                            />
                        </Scrollable>
                    </div>
                    <div className={[style.right].join(' ')}>
                        <Record />
                    </div>
                </Split>
                <Modal
                    title="20px to Top"
                    visible={this.state.modalVisible}
                    onOk={this.modalOk}
                    onCancel={this.modalCancel}
                >
                    <Form
                        handleChange={this.handleChange}
                    >
                        <Input
                            name="codigo"
                            label="Código"
                           // placeholder="Código..."
                            defaultValue="Código"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            value={this.state.data.codigo}
                        />
                        <Input
                            name="nombre"
                            label="Descripción"
                            placeholder="Descripción..."
                            value={this.state.data.nombre}
                        />
                    </Form>
                </Modal>
            </React.Fragment>

        )
    }
}



