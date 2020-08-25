import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';
import {
    Input,
    Form,
} from 'antd';

class ProductGroups extends React.Component {

    pageRef = React.createRef();

    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };

    getFormTitle = (current) => {
        return !current.id  ? "Add Product Group" : "Edit Product Group"
    }

    getFormContent = (current) => {
        return (
            <>
                <Form.Item 
                        name="code" 
                        label="Code:"
                        {...this.formLayout}
                        initialValue={current.code}
                        rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                        name="description" 
                        label="Description:"
                        {...this.formLayout}
                        initialValue={current.description}
                        rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
            </>
        )
    }

    handleAddRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/add',
            payload: payload,
            callback: (function(error, data, response) {
                this.pageRef.current.handleRefresh()
            }).bind(this)
        })
    }

    handleUpdateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/update',
            payload,
            id: payload['id'],
            callback: (function(error, data, response) {
                this.pageRef.current.handleRefresh()
            }).bind(this)
        })
    }

    handleRemoveRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/remove',
            payload: payload['id'],
            callback: (function(error, data, response) {
                this.pageRef.current.handleRefresh()
            }).bind(this)
        })
    }

    handleFetchData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.pageRef.current.setData(data)
            }).bind(this)
        })
    }

    render() {
        const columns = [
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                width: 100
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: 200
            },
        ]

        return (
            <StandardPage 
                ref={this.pageRef}
                title="Product Groups" 
                columns={columns}
                rowKey="id"
                formTitle={this.getFormTitle}
                formContent={this.getFormContent}
                onAdd={this.handleAddRow}
                onUpdate={this.handleUpdateRow}
                onRemove={this.handleRemoveRow}
                onFetchData={this.handleFetchData}
            />
        )    
    }
}

export default connect(({ productGroup }) => ({
    productGroup,
}))(ProductGroups);