import React from 'react';
import style from './index.module.css'
import log from 'loglevel';
import { Spin, Icon } from 'antd';

import 'antd/dist/antd.css';

//log.setDefaultLevel('info')

interface Props {
    size?: number,
    tip?: string,
    duration: number,
    children?: any,
    status: string,
    auto?: number,
    spin?: any,

}

interface State {
    status: string
}


export default class Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Loader:constructor reached');
        super(props);
        this.state = {
            status: this.props.status
        };

    }

    componentDidMount(): void {
        log.info('Loader:componentDidMount reached');
        if (this.props.auto != 0) {
            setTimeout(() => {
                this.setState({
                    status: 'loaded'
                })
            }, this.props.auto)
        }
    }

    componentDidUpdate(prevProps: any) {
        log.info('Loader:componentDidUpdate reached');
        if (this.props.status !== prevProps.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        log.debug('Loader:render reached');
        let loaded = (this.state.status == 'loaded')?style.loaded:null;
        let unloaded = (this.state.status == 'loaded')?style.unloaded:null;

        return (
            <div className={[style.component].join(' ')}>
                <div className={[style.container, unloaded].join(' ')}>
                    {this.props.children}
                </div>
                <div className={[style.container, loaded].join(' ')}>
                   <div className={[style.loaderContainer].join(' ')}>
                       <Spin indicator={<Icon type="loading" style={{ fontSize: this.props.size }} spin />} tip={this.props.tip} />
                   </div>
                </div>
            </div>
        );
    }
    static defaultProps = {size: 24, tip: '', duration: 700, status: 'loading', auto: 0};
}



