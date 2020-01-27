import React from 'react';
import Loader from '../loader';

import axios from 'axios';
import log from 'loglevel';

import { Pagination } from 'antd';

import style from './index.module.css';

interface WithDataProps {
    url: string,
    [x: string]: any
}

interface State {
    status: string,
    data: any,
}

const withData = <P extends object>(Component: React.ComponentType<P>) =>
    class WithData extends React.Component<P & WithDataProps, State> {
        public state: State = {
            status: 'loading',
            data: null
        }

        async handlePageChange(e: number): Promise<any> {
            log.info('DataProvider:handlePageChange reached');
            await this.loadData(e);
        }

        async loadData(page: number=1) : Promise<any> {
            log.info('DataProvider:loadData reached');
            this.setState({status: 'loading'});
            try {
                let {data} = await axios.get(this.props.url + '?page=' + page)
                this.setState({status: 'loaded', data: data})
            }
            catch (e) {
                console.log(e);
            }
        }

        async componentDidMount(): Promise<any> {
            await this.loadData();
        }

        render() {
            const { ...props } = this.props;
            let pagination = null;
            if (this.state.data) {
                pagination = (
                    <Pagination
                        size="small"
                        total={this.state.data.total}
                        pageSize={this.state.data.size}
                        current={this.state.data.page}
                        defaultCurrent={1}
                        onChange={(e) => { this.handlePageChange(e)}}
                        showLessItems={true}
                        className={[style.pagination].join(' ')}
                    />
                );
            }
            return (
                <Loader status={this.state.status}>
                    <Component {...props as P} data={this.state.data} className={[style.container].join(' ')}/>
                    <div className={[style.footer].join(' ')}>
                        {pagination}
                    </div>
                </Loader>
            );
        }

        static defaultProps = {status: 'loading', data: null};
    };

export default withData;
