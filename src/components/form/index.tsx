import React from 'react';
import style from './index.module.css'
import log from 'loglevel';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

import 'antd/dist/antd.css';
import {any} from "prop-types";

//log.setDefaultLevel('info')

interface InputProps {
    form?: any,
    name: string,
    placeholder?: string,
    [x: string]: any
}
interface InputState {}

class NInput extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        log.info('Form.Input:constructor reached');
        super(props);
        console.log('VALUES')
        console.log(this.props.value)
    }

    render() {
        log.info('Form.Input:constructor reached');
        let {name, label, ...props} = this.props;
        return (
            <Form.Item
                label={label?label:null}
            >
                <Input
                    name={name}
                    {...props}
                />,
            </Form.Item>
        )
    }
}

interface Props {
    children: any,
    handleChange?: any,
    handleSubmit?: any
}

interface State {
}

class NForm extends React.Component<Props, State> {
    Input: any

    constructor(props: Props) {
        log.info('Form:constructor reached');
        super(props);


        this.Input = Input;
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: any): void {
        console.log('xxx');
        console.log(e.currentTarget.value);
        console.log(e.currentTarget.name);
        this.props.handleChange({
            index: e.currentTarget.name,
            value: e.currentTarget.value
        })
    }

    componentDidMount(): void {
        log.info('Form:componentDidMount reached');
    }

    componentDidUpdate(prevProps: any) {
        log.info('Form:componentDidUpdate reached');
    }

    handleSubmit(e: any)  {
        e.preventDefault();
        this.props.handleSubmit(e);
        // this.props.form.validateFields((err:any, values:any) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //     }
        // });
        // if (this.props.handleSubmit) {
        //     this.props.handleSubmit(e);
        // }
    };

    render() {
        log.debug('Form:render reached');

        let children = null;
        if (this.props.children) {
            children = (Array.isArray(this.props.children))?this.props.children:[this.props.children];
            children = children.map((child: any) => {
                let elem = React.cloneElement(child, {
                    key: child.props.name,
                    onChange: this.handleChange
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

export {NInput as Input, NForm as Form };
