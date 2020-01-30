import React from 'react';
import style from './index.module.css'
import log from 'loglevel';
import axios from 'axios';

import Table from '../../../components/table';

interface Props {
}

interface State {
    data: any,
}

export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        log.info('Record:constructor reached');
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            data: null
        }
    }

    async componentDidMount(): Promise<any> {
        let results = await axios.get('http://127.0.0.1:3333/api/fullNodos');
        console.log(results);
        this.setState({
            data: results.data
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
               <Table data={this.state.data}/>
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
