import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../PageHeaderWrapper'
import StandardTable from '../StandardTable'
import {
    Card,
    Button,
    Input,
    InputNumber,
    Form,
    Popconfirm
} from 'antd';
import { 
    CloseCircleOutlined, 
    PlusOutlined, 
    SaveOutlined, 
    ExportOutlined, 
    ImportOutlined,
    ReloadOutlined, 
    DeleteOutlined, 
    EditOutlined 
} from '@ant-design/icons';

import styles from './index.less';

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />

    return (
        <td {...restProps}>
            { editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        }
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

class StandardPage extends PureComponent
{
    constructor(props) {
        super(props);

        this.state = {
            data: [], editingKey: '',
        }
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleStandardTableChange=(pagination, filtersArg, sorter) => {
        // TODO
    }

    handleAdd = () => {
        const { data } = this.state;
        const { formRef, newRow } = this.props;
        this.setState({
            editingKey: '',
            data: [...data, newRow()]
        })
        formRef.current.resetFields()
    }

    handleRemove = (record) => {
        const { removeRow, rowKey } = this.props;
        var callback = (function(error, data, response) {
            this.handleRefresh()
        }).bind(this)
        removeRow(record[rowKey], callback)
    }

    handleRefresh = () => {
        const { fetchData } = this.props
        const callback = (function(error, data, response) {
            this.setState({ data: data })
        }).bind(this)
        fetchData(callback);
        this.setState({ editingKey: null })
    }

    handleEdit = (record) => {
        const { rowKey, formRef } = this.props
        formRef.current.setFieldsValue({ ...record });
        this.setState({ editingKey: record[rowKey] })
    }

    handleSave = (record) => {
        const { formRef, addRow, updateRow, rowKey } = this.props;
        const { editingKey } = this.state;
        formRef.current.validateFields().then(fields => {
            var callback = (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
            if (editingKey === '')
                addRow({...fields}, callback)                
            else
                updateRow({...fields } , callback)                
            this.setState({ editingKey: null })
        })
        .catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });   
    }

    handleCancel = (record) => {
        const { formRef } = this.props;
        formRef.current.resetFields();
        this.handleRefresh();
        this.setState({
            editingKey: null
        });
    }
    
    isEditing = (record) => {
        const { editingKey } = this.state;
        const { rowKey } = this.props;
        return record[rowKey] === editingKey;
    }

    renderOperation = (text, record) => {
        const editable = this.isEditing(record) 
        return !editable ? (
            <span style={{ whiteSpace: 'nowrap' }}>
                <Button onClick={() => { this.handleEdit(record) }}>
                    <EditOutlined/> Edit
                </Button>
                <Popconfirm title="Sure to Remove?" onConfirm={() => { this.handleRemove(record) }}>
                    <Button style={{ marginLeft: 8 }}>
                        <DeleteOutlined/> Remove
                    </Button>
                </Popconfirm>
            </span>
        ) : (
            <span style={{ whiteSpace: 'nowrap' }}>
                <Button onClick={() => { this.handleSave(record) }}>
                    <SaveOutlined/> Save
                </Button>
                <Popconfirm title="Sure to Cancel?" onConfirm={() => { this.handleCancel(record) }}>
                    <Button style={{ marginLeft: 8 }}>
                        <CloseCircleOutlined/> Cancel
                    </Button>
                </Popconfirm>
            </span>
        )
    }

    render() {
        const { data, editingKey } = this.state;
        const { title, formRef, rowKey = rowKey || 'id', columns, ...rest } = this.props;

        var newColumns = [...columns, { 
            title: 'Operation',
            dataIndex: 'operation',
            key: 'operation',
            editable: false,
            width: 210,
            fixed: 'right',
            render: this.renderOperation
        }]

        var mergedColumns = newColumns.map(col => {
            if (!col.editable)
                return col;
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

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
                        <Form ref={formRef} component={false}>
                            <StandardTable 
                                rowKey={rowKey} 
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                columns={mergedColumns}
                                data={data}
                                onChange={this.handleStandardTableChange}
                                scroll={{ x: 600 }}
                                {...rest} />
                        </Form>
                    </div>
                 </Card>
            </PageHeaderWrapper>
        )
    }
}

export default StandardPage;