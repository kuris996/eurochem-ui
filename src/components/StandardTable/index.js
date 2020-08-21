import React, { PureComponent } from 'react';
import { Table, Form } from 'antd';
import styles from './index.less';
import EditableCell from './EditableCell'
import StandardOperation from '../StandardOperation'

class StandardTable extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            editingKey: null,
        }

        this.formRef = React.createRef()
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    setEditingKey = (key, record) => {
        const { rowKey } = this.props;
        this.setState({
            editingKey: key
        })            
        if (record && key === record[rowKey])
            this.formRef.current.setFieldsValue({...record})
        else
            this.formRef.current.resetFields()
    }

    handleEdit = (record) => {
        const { rowKey } = this.props;
        this.setState({
            editingKey: record[rowKey]
        })
        this.formRef.current.setFieldsValue({...record})
    }

    handleRemove = (record) => {
        const { removeRow } = this.props;
        removeRow(record)
    }

    handleSave = (record) => {
        const { addRow, updateRow } = this.props;
        const { editingKey } = this.state;
        this.formRef.current.validateFields().then(fields => {            
            if (editingKey === '') {
                delete record.id
                addRow({...record, ...fields})                
            } else {
                updateRow({...record, ...fields }) 
            }               
            this.setEditingKey(null)
        })
        .catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });
    }

    handleCancel = (record) => {
        const { onCancel } = this.props;
        this.setEditingKey(null)
        if (onCancel)
            onCancel(record)
    }

    isEditing = (record) => {
        const { editingKey } = this.state;
        const { rowKey } = this.props;
        return record[rowKey] === editingKey;
    }

    render() {
        const { data, rowKey, columns, pagination, initialValues, editable, ...rest } = this.props;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination
        };

        var newColumns = [...columns]
        if (editable) {
            newColumns.push({
                title: 'Operation',
                editable: false,
                fixed: 'right',
                width: 150,
                render: (text, record) => {
                    return (
                        <StandardOperation 
                            text={text} 
                            record={record}
                            isEditing={this.isEditing}
                            onEdit={this.handleEdit}
                            onRemove={this.handleRemove}
                            onSave={this.handleSave}
                            onCancel={this.handleCancel}
                            {...rest}
                        />
                    )
                }
            })
        }

        var mergedColumns = newColumns.map(col => {
            if (!editable || !col.editable)
                return col;
            return {
                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.inputType,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    options: col.options,
                    render: col.render,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <div className={styles.standardTable}>
                <Form ref={this.formRef} component={false} initialValues={initialValues} >
                    <Table
                        bordered
                        rowKey={rowKey || 'id'}
                        dataSource={data}
                        pagination={paginationProps}
                        onChange={this.handleTableChange}
                        size="small"
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        columns={mergedColumns}
                        {...rest}
                    />
                </Form>
            </div>
        );
    }
}

export default StandardTable;
