import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import EditableCell from './EditableCell'
import StandardOperation from '../StandardOperation'

class StandardTable extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            editingKey: null,
        }
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    setEditingKey = (key) => {
        this.setState({
            editingKey: key
        })
    }

    isEditing = (record) => {
        const { editingKey } = this.state;
        const { rowKey } = this.props;
        return record[rowKey] === editingKey;
    }

    render() {
        const { data = [], rowKey, columns, editable, ...rest } = this.props;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
        };

        var newColumns = [...columns]
        if (editable) {
            const { onEdit, onRemove, onSave, onCancel } = editable
            newColumns.push({
                title: 'Operation',
                dataIndex: 'operation',
                editable: false,
                fixed: 'right',
                width: 150,
                render: (text, record) => {
                    return (
                        <StandardOperation 
                            text={text} 
                            record={record}
                            isEditing={this.isEditing}
                            onRemove={onRemove}
                            onEdit={onEdit}
                            onSave={onSave}
                            onCancel={onCancel}
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
            </div>
        );
    }
}

export default StandardTable;
