import React from 'react';
import style from './index.module.css'
import log from 'loglevel';

interface Props {
    data: any
}

interface State {
}

export default class Component extends React.Component<Props> {
    constructor(props: Props) {
        log.info('ListItem:constructor reached');
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e: string): void {
        log.info('ListItem:handleClick reached');
        console.log(e);
    }

    render() {
        log.info('ListItem:render reached');
        let data = this.props.data;
        return (
            <div className={[style.component].join(' ')} key={data._id} onClick={() => { this.handleClick(data._id)}}>
                {data._id}
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
