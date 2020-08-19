import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../PageHeaderWrapper'
import StandardTable from '../StandardTable'
import StandardOperation from '../StandardOperation'
import {
    Card,
    Button,
    Form,
} from 'antd';
import { 
    PlusOutlined, 
    ExportOutlined, 
    ImportOutlined,
    ReloadOutlined, 
} from '@ant-design/icons';

import styles from './index.less';

class StandardPage extends PureComponent
{
    constructor(props) {
        super(props);

        this.tableRef = React.createRef();
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleStandardTableChange=(pagination, filtersArg, sorter) => {
        // TODO
    }

    handleAdd = () => {
        const { formRef, newRow } = this.props;
        formRef.current.resetFields()
        newRow()      
        this.tableRef.current.setEditingKey('')
    }

    handleRemove = (record) => {
        const { removeRow, rowKey } = this.props;
        removeRow(record[rowKey])
    }

    handleRefresh = () => {
        const { fetchData } = this.props
        fetchData();
        this.tableRef.current.setEditingKey(null)
    }

    handleEdit = (record) => {
        const { rowKey, formRef } = this.props
        formRef.current.setFieldsValue({ ...record });
        this.tableRef.current.setEditingKey(record[rowKey])
    }

    handleSave = (record) => {
        const { formRef, addRow, updateRow } = this.props;
        const { editingKey } = this.state;
        formRef.current.validateFields().then(fields => {            
            if (editingKey === '') {
                delete record.id
                addRow({...record, ...fields})                
            } else {
                updateRow({...record, ...fields }) 
            }               
            this.tableRef.current.setEditingKey(null)
        })
        .catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });   
    }

    handleCancel = (record) => {
        const { formRef } = this.props;
        formRef.current.resetFields();
        this.handleRefresh();
        this.tableRef.current.setEditingKey(null)
    }
    
    isEditing = (record) => {
        const { editingKey } = this.state;
        const { rowKey } = this.props;
        return record[rowKey] === editingKey;
    }    

    render() {
        const { editingKey } = this.state;
        const { title, formRef, data, rowKey = rowKey || 'id', initialValues, extraOperations, ...rest } = this.props;

        return (
            <PageHeaderWrapper title={title}>
                <Card bordered={false}>
                    <div>
                        <div className={styles.tableListOperator}>
                            <span>
                                <Button type="primary" onClick={this.handleAdd} disabled={editingKey !== null}>
                                    <PlusOutlined/> Add
                                </Button>
                                <Button type="primary" onClick={this.handleRefresh}>
                                    <ReloadOutlined/> Refresh
                                </Button>
                                <Button type="primary">
                                    <ExportOutlined/> Export
                                </Button>
                                <Button type="primary">
                                    <ImportOutlined/> Import
                                </Button>
                            </span>
                        </div>
                        <Form ref={formRef} component={false} initialValues={initialValues} >
                            <StandardTable 
                                ref={this.tableRef}
                                rowKey={rowKey}
                                data={data}
                                extraOperations={extraOperations}
                                scroll={{ x: 'max-content' }}
                                onChange={this.handleStandardTableChange}
                                editable = {{
                                    onEdit: record => { this.handleEdit(record) },
                                    onRemove: record => { this.handleRemove(record) },
                                    onSave: record => { this.handleSave(record) },
                                    onCancel: record => { this.handleCancel(record) },
                                }}
                                {...rest} 
                            />
                        </Form>
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default StandardPage;