import React, { Component } from 'react'
import { Form, Input } from 'antd'
import styles from './index.less'
import ItemMap from './map'
const FormItem = Form.Item;

class WrapFormItem extends Component {

    componentDidMount() {
        const { updateActive, name } = this.props;
        if (updateActive)
            updateActive(name)
    }

    render() {
        const {
            customprops,
        } = this.props;

        return (
            <FormItem {...customprops} >
                <Input {...customprops}  />
            </FormItem>
        )
    }
}

const LoginItem = {};

Object.keys(ItemMap).forEach(key => {
    const item = ItemMap[key];
    LoginItem[key] = props => (
        <WrapFormItem
            customprops={item.props}
            {...props}
        />
    );
});

export default LoginItem;