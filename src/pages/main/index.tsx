import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import Split from 'react-split-pane';
import {Icon as KitIcon} from 'react-icons-kit';
import {menu} from 'react-icons-kit/feather/menu';
import {ic_menu} from 'react-icons-kit/md/ic_menu';

import Menu from '../../components/menu';

import './resizer.css';

interface State {
    leftPaneWidth: number
}

interface Props {
}

interface Props {}
export default class Component extends React.Component<Props, State> {


    constructor(props: Props) {
        log.info('Main:constructor reached');
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
        this.state = {
            leftPaneWidth: 320
        };
    }

    handleMenuClick(): void {
        log.info('Main:handleMenuClick reached');
        console.log(this.state.leftPaneWidth)
        if (this.state.leftPaneWidth == 320) {
            this.setState({leftPaneWidth: 50});
        }
        else {
            this.setState({leftPaneWidth: 320});
        }

    }

    componentDidMount(): void {
        log.info('Main:componentDidMount reached');

    }

    render() {
        log.info('Main:render reached');
        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.title].join(' ')}>
                    <div className={[style.menuIcon].join(' ')}>
                        <div className={[style.icon].join(' ')}>
                            <KitIcon size={'100%'} icon={ic_menu} onClick={this.handleMenuClick}/>
                        </div>
                    </div>
                </div>
                <Split minSize={this.state.leftPaneWidth} maxSize={this.state.leftPaneWidth} split="vertical" className={[style.body].join(' ')}>
                    <div className={[style.left].join(' ')}>
                        <Menu />
                    </div>
                    <Split  minSize={50} maxSize={320}  className={[style.center].join(' ')}>
                        <div className={[style.middle].join(' ')}></div>
                        <div className={[style.right].join(' ')}></div>
                    </Split>
                </Split>
            </div>
        );
    }
}



