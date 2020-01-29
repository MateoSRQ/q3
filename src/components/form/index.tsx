import React from 'react';
import style from './index.module.css'
import log from 'loglevel';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import validate from 'validate.js';

import 'antd/dist/antd.css';

//log.setDefaultLevel('info')

interface InputProps {
    form?: any,
    name: string,
    placeholder?: string,
    [x: string]: any
}
interface InputState {
    validateStatus?: any
    result?: string
}

class NInput extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        log.info('Form.Input:constructor reached');
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            validateStatus: undefined,
            result: ''
        };
    }

    onBlur(e: any) {
        console.log('item blur');
        console.log(this.props.validators)
        if (this.props.validators) {
            let result = validate.single(e.currentTarget.value, this.props.validators);
            if (result == undefined ) {
                console.log('ok')
                this.setState({result: result, validateStatus: 'success'});
            }
            else {
                console.log('error')
                this.setState({result: result, validateStatus: 'warning'});
            }
        }
//        this.props.handleBlur(e);
    }

    onChange(e: any) {
        console.log('item change');
        this.props.handleChange(e);
    }

    render() {
        log.info('Form.Input:constructor reached');
        let {name, label, handleBlur, handleChange, ...props} = this.props;
        return (
            <Form.Item
                label={label?label:null}
                validateStatus={this.state.validateStatus}
                help={this.state.result}
            >
                <Input
                    name={name}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                    {...props}
                />
            </Form.Item>
        )
    }
}

interface Props {
    children?: any,
    handleChange?: any,
    handleSubmit?: any,
    validators?: any
}

interface State {
    validateStatus?: string
}

class NForm extends React.Component<Props, State> {
    Input: any

    constructor(props: Props) {
        log.info('Form:constructor reached');
        super(props);
        this.Input = Input;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(e: any): void {
        log.info('Form:handleChange reached');
        console.log('form')
        if (this.props.validators && this.props.validators[e.currentTarget.name]) {
            let result = validate.single(e.currentTarget.value, this.props.validators[e.currentTarget.name]);
        }
    }

    handleChange(e: any): void {
        log.info('Form:handleChange reached');
        console.log('form')
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
        console.log('RENDER')

        if (this.props.children) {
            children = (Array.isArray(this.props.children))?this.props.children:[this.props.children];
            children = children.map((child: any) => {

                console.log(this.props.validators)
                console.log(this.props.validators[child.props.name])

                let elem = React.cloneElement(child, {
                    key: child.props.name,
                    handleChange: this.handleChange,
                    handleBlur: this.handleBlur,
                    validators: this.props.validators[child.props.name]
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
