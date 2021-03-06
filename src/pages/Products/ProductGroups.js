import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components//PageHeaderWrapper'
import StandardTable from '@/components//StandardTable'
import StandardButtonBox from '@/components/StandardButtonBox' 
import {
    Input,
    Form,
    Card
} from 'antd';

class ProductGroups extends React.Component {

    tableRef = React.createRef();

    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };

    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
    }

    componentDidMount() {
        this.handleRefresh()
    } 

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

    handleAdd = (item) => {
        this.tableRef.current.addRecord(item)
    }

    handleRefresh = () => {
        const { pagination } = this.state
        this.tableRef.current.handleStandardTableChange(pagination)
    }

    handleAddRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/add',
            payload: payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleUpdateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/update',
            payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleRemoveRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/remove',
            payload: payload['id'],
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleFetchData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.setState({
                    data: data.data,
                    pagination: {
                        current: (data.offset / 10) + 1,
                        pageSize: data.limit,
                        total: data.total
                    }
                })
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

        const { data, pagination } = this.state;

        return (
            <PageHeaderWrapper title="Product Groups">
                <Card bordered={false}>
                    <div>
                        <StandardButtonBox
                            onAdd={this.handleAdd}
                            onRefresh={this.handleRefresh}
                        />
                        <StandardTable 
                            ref={this.tableRef}
                            columns={columns}
                            rowKey="id"
                            data={data}
                            pagination={pagination}
                            formTitle={this.getFormTitle}
                            formContent={this.getFormContent}
                            onAdd={this.handleAddRow}
                            onUpdate={this.handleUpdateRow}
                            onRemove={this.handleRemoveRow}
                            onFetchData={this.handleFetchData}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        )    
    }
}

export default connect(({ productGroup }) => ({
    productGroup,
}))(ProductGroups);