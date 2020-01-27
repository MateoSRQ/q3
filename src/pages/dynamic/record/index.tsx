import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

import { Tabs} from 'antd';
const { TabPane } = Tabs;


interface Props {
}

interface State {
}

export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.info('Record:constructor reached');
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: string): void {
        log.info('Record:handleClick reached');
        console.log(e);
    }

    render() {
        log.info('Record:render reached');
        return (
            <div className={[style.component].join(' ')} onClick={() => { this.handleClick('1')}}>
                ITEM
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
