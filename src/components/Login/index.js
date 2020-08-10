import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import classNames from 'classnames'
import LoginSubmit from './LoginSubmit'
import LoginItem from './LoginItem'
import styles from './index.less'

class Login extends Component {
    formRef = React.createRef();
    
    static propTypes = {
        className: PropTypes.string,
        onSubmit: PropTypes.func,
    };

    static defaultProps = {
        className: '',
        onSubmit: () => {},
    };

    handleSubmit = values => {
        const { onSubmit } = this.props;
        onSubmit(values);
    }

    render() {
        const { className, children } = this.props;
        return (
            <div className={classNames(className, styles.login)}>
                <Form ref={this.formRef} onFinish={this.handleSubmit}>
                    {children}
                </Form>
            </div>
        );
    }
}

Login.Submit = LoginSubmit;

Object.keys(LoginItem).forEach(item => {
    Login[item] = LoginItem[item];
});

export default Login;