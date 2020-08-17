import React from 'react';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
import {
    Card,
    Button,
    Input,
    InputNumber,
    Form,
    Popconfirm
} from 'antd';
import { connect } from 'dva';

import styles from '@/utils/page.less';

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

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [            
            {
                title: 'Local Name',
                dataIndex: 'local_name',
                key: 'local_name',
                editable: true,
                width: 100,
            },
            {
                title: 'En Name',
                dataIndex: 'en_name',
                key: 'en_name',
                editable: true,
                width: 100,
            },
            {
                title: 'Product Group',
                dataIndex: 'product_group_code',
                key: 'product_group_code',
                editable: true,
                width: 100,
            },
            {
                title: 'Product Type',
                dataIndex: 'product_type',
                key: 'product_type',
                editable: true,
                width: 100,
            },
            {
                title: 'Tn Ved Code',
                dataIndex: 'tn_ved_code',
                key: 'tn_ved_code',
                editable: true,
                width: 100,
            },
            {
                title: 'Rail Code',
                dataIndex: 'rail_code',
                key: 'rail_code',
                editable: true,
                width: 100,
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                key: 'operation',
                editable: false,
                width: 180,
                fixed: 'right',
                render: (text, record) => {
                    const editable = this.isEditing(record)
                    return !editable ? (
                        <span style={{ whiteSpace: 'nowrap' }}>
                            <Button onClick={() => { this.handleEdit(record) }}>
                                <EditOutlined/> Edit
                            </Button>
                            <Popconfirm title="Sure to remove?" onConfirm={() => { this.handleRemove(record) }}>
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
                            <Popconfirm title="Sure to cancel?" onConfirm={() => { this.handleCancel(record) }}>
                                <Button style={{ marginLeft: 8 }}>
                                    <CloseCircleOutlined/> Cancel
                                </Button>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        ]

        this.state = { 
            editingKey: null, 
            data:[] 
        }    
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleAdd = () => {
        const { data } = this.state;
        const newData = {
            id: '',
            local_name: '',
            en_name: '',
            product_group_code: '',
            product_type: '',
            tn_ved_code: '',
            rail_code: ''
        };
        this.setState({
            editingKey: '',
            data: [...data, newData],
        });
        this.formRef.current.setFieldsValue({ 
            local_name: '',
            en_name: '',
            product_group_code: '',
            product_type: '',
            tn_ved_code: '',
            rail_code: '' 
        });
    }

    handleRemove = (record) => {
        const { dispatch } = this.props;       

        var callback = (function(error, data, response) {
            this.handleRefresh()
        }).bind(this)

        dispatch({
            type: 'product/remove',
            payload: record.id,
            callback
        }) 
    }

    handleRefresh = () => {
        const { dispatch } = this.props;
        const params = {
            offset: 0,
            limit: 100
        }
        var callback = (function(error, data, response) {
            this.setState({ data: data })
        }).bind(this)
        dispatch({
            type: 'product/fetch',
            payload: {...params},
            callback,
        })
        this.setState({
            editingKey: null
        })
    }

    handleStandardTableChange=(pagination, filtersArg, sorter) => {
        console.log("change")
    }

    handleEdit = (record) => {
        this.formRef.current.setFieldsValue({
            id: '',
            local_name: '',
            en_name: '',
            product_group_code: '',
            product_type: '',
            tn_ved_code: '',
            rail_code: '',
            ...record
        });
        this.setState({
            editingKey: record.id
        })
    }

    handleSave = (record) => {
        const { dispatch } = this.props;
        const { editingKey } = this.state;
        this.formRef.current.validateFields().then(fields => {
            var callback = (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
            if (editingKey === '') {
                dispatch({
                    type: 'product/add',
                    payload: {...fields},
                    callback,
                })
            } else {
                dispatch({
                    type: 'product/update',
                    payload: {...record, ...fields},
                    callback,
                })
            }
            this.setState({
                editingKey: null
            })
        })
        .catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });        
    }

    handleCancel = (record) => {
        this.setState({
            editingKey: null
        })
        //this.formRef.current.setFieldsValue({ code: '', description: '' });
        this.formRef.current.resetFields()
        this.handleRefresh()
    }

    isEditing = (record) => {
        const { editingKey } = this.state
        return record.id === editingKey;
    }

    formRef = React.createRef();

    render() {
        const { data, editingKey } = this.state;
        
        const columns = this.columns.map(col => {
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
            <PageHeaderWrapper title="Products">
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
                        <Form ref={this.formRef} component={false}>
                            <StandardTable
                                rowKey='code'
                                components={{
                                    body: {
                                        cell: EditableCell,
                                    },
                                }}
                                scroll={{ x: 800 }}
                                columns={columns}
                                data={data}
                                onChange={this.handleStandardTableChange}
                            />
                        </Form>
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default connect(({ product }) => ({
    product,
}))(Products);