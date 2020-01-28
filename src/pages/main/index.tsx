import React from 'react';
import style from './index.module.css';
import log from 'loglevel';

import Split from 'react-split-pane';
import {Icon as KitIcon} from 'react-icons-kit';
import {menu} from 'react-icons-kit/feather/menu';
import {ic_menu} from 'react-icons-kit/md/ic_menu';

import Menu from '../../components/menu';
import Dynamic from '../dynamic';
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
                    <div className={[style.logoContainer].join(' ')}>NATCLAR</div>
                </div>
                <Split minSize={this.state.leftPaneWidth} maxSize={this.state.leftPaneWidth} split="vertical" className={[style.body].join(' ')}>
                    <div className={[style.left].join(' ')}  style={{width: '320px'}}>
                        <Menu />
                    </div>
                    <Dynamic />
                </Split>
            </div>
        );
    }
}



