import React from 'react';
import style from './index.module.css'
import log from 'loglevel';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import 'antd/dist/antd.css';
import {any} from "prop-types";

//log.setDefaultLevel('info')

interface _InputProps {
    form?: any,
    name: string,
    placeholder?: string,
    [x: string]: any
}
interface _InputState {}

class _Input extends React.Component<_InputProps, _InputState> {
    constructor(props: _InputProps) {
        log.info('Form.Input:constructor reached');
        super(props);
    }

    render() {
        log.info('Form.Input:constructor reached');
        const { getFieldDecorator } = this.props.form;
        return (
            <Form.Item
                label={this.props.label?this.props.label:null}
            >
                {getFieldDecorator(this.props.name, {
                    rules: this.props.rules?this.props.rules:'',
                })(
                    <Input
                        prefix={this.props.prefix?this.props.prefix:null}
                        placeholder={this.props.placeholder?this.props.placeholder:''}
                    />,
                )}
            </Form.Item>
        )
    }
}

interface Props {
    form: any,
    children: any,
    x: any,
    [x: string]: any
}

interface State {
}

class _Component extends React.Component<Props, State> {
    constructor(props: Props) {
        log.info('Form:constructor reached');
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log('FORM');
        console.log(this.props);
    }

    componentDidMount(): void {
        log.info('Form:componentDidMount reached');
    }

    componentDidUpdate(prevProps: any) {
        log.info('Form:componentDidUpdate reached');
    }

    handleSubmit(e: any)  {
        e.preventDefault();
        this.props.form.validateFields((err:any, values:any) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        if (this.props.handleSubmit) {
            this.props.handleSubmit(e);
        }
    };

    render() {
        log.debug('Form:render reached');
        const { getFieldDecorator } = this.props.form;

        let children = null;
        if (this.props.children) {
            children = (Array.isArray(this.props.children))?this.props.children:[this.props.children];
            children = children.map((child: any) => {
                let elem = React.cloneElement(child, {
                    form: this.props.form,
                    key: child.props.name
                })
                return elem;
            })
        }
        return (
            <div className={[style.component].join(' ')}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    {children}
                </Form>
            </div>
        );
    }

}

const DerivedComponent = Form.create({
    name: 'form'
})(_Component);

const Component = {
    Form: DerivedComponent,
    Input: _Input
};

export default Component;
