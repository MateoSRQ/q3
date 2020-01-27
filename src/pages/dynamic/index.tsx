import React from 'react';
import style from './index.module.css';
import log from 'loglevel';
import Split from "react-split-pane";
import Scrollable from "react-custom-scrollbars";
import Item from "./item";
import withDataProvider from "../../components/dataprovider";
import List from "../../components/list";
import Record from './record';

import { Modal, Button, Radio, Icon } from 'antd';

let DataList = withDataProvider(List);

interface State {
    modalVisible: boolean
}

interface Props {
}


export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Main:constructor reached');
        super(props);
        this.newRecord = this.newRecord.bind(this);
        this.state = {
            modalVisible: false
        };
    }

    newRecord(): void {
        log.info('Main:newRecord reached');
        console.log('newRecord')
        this.setState({modalVisible: true} );
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
                    visible={true}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </React.Fragment>

        )
    }
}



