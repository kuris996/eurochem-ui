import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components//PageHeaderWrapper'
import StandardTable from '@/components//StandardTable'
import StandardButtonBox from '@/components//StandardButtonBox' 
import {
    Input,
    Form,
    Card
} from 'antd';

class StorageUnits extends React.Component {

    tableRef = React.createRef();

    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };

    getFormTitle = (current) => {
        return !current.id  ? "Add Storage Unit" : "Edit Storage Unit"
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
                        name="local_name" 
                        label="Local Name:"
                        {...this.formLayout}
                        initialValue={current.local_name}
                        rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
                <Form.Item 
                        name="en_name" 
                        label="En Name:"
                        {...this.formLayout}
                        initialValue={current.en_name}
                        rules={[{ required: false }]}>
                    <Input />
                </Form.Item>
            </>
        )
    }

    handleAdd = (item) => {
        this.tableRef.current.add(item)
    }

    handleRefresh = () => {
        this.tableRef.current.refreshData()
    }

    handleAddRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'storageUnit/add',
            payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleUpdateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'storageUnit/update',
            payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleRemoveRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'storageUnit/remove',
            payload: payload['id'],
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleFetchData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'storageUnit/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.tableRef.current.setData(data)
            }).bind(this)
        })
    }

    render() {
        const columns = [   
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                editable: true,
                width: 100,
            },         
            {
                title: 'Local Name',
                dataIndex: 'local_name',
                key: 'local_name',
                editable: true,
                width: 150,
            },
            {
                title: 'En Name',
                dataIndex: 'en_name',
                key: 'en_name',
                editable: true,
                width: 150,
            },
        ]

        return (
            <PageHeaderWrapper title="Storage Units" >
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

export default connect(({ storageUnit }) => ({
    storageUnit,
}))(StorageUnits);