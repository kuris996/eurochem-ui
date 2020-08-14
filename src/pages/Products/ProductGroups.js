import React, { PureComponent } from 'react';
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

class ProductGroups extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                width: '30%',
                editable: true,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                width: '40%',
                editable: true,
            },
            {
                title: 'Operation',
                dataIndex: 'operation',
                key: 'operation',
                width: '30%',
                editable: false,
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
                        <span>
                            <Button onClick={() => { this.handleEdit(record) }}>
                                <SaveOutlined/> Save
                            </Button>
                            <Popconfirm title="Sure to cancel?" onConfirm={() => { this.handleCancel() }}>
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
            editingKey: '',
            recordCount: 1000,
            data:[]
        }    
    }

    componentDidMount() {
        this.handleRefresh()
    }

    handleAdd = () => {
        const { data, recordCount } = this.state;
        const newData = {
            code: recordCount,
            description: `description ${recordCount}`,
        };
        this.setState({
            data: [...data, newData],
            recordCount: recordCount + 1,
        });
        const { dispatch } = this.props;
        var callback = (function(error, data, response) {
            this.handleRefresh()
        }).bind(this)
        dispatch({
            type: 'productGroup/add',
            payload: {...newData},
            callback,
        })
    }

    handleRemove = (record) => {
        const { dispatch } = this.props;       

        var callback = (function(error, data, response) {
            this.setState({
                selectedRows: [],
            })
            this.handleRefresh()
        }).bind(this)

        dispatch({
            type: 'productGroup/remove',
            payload: record.code,
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
            type: 'productGroup/fetch',
            payload: {...params},
            callback,
        })
    }

    handleStandardTableChange=(pagination, filtersArg, sorter) => {
        console.log("change")
    }

    handleEdit = (record) => {
        this.formRef.current.setFieldsValue({ code: '', description: '', ...record });
        this.setState({
            editingKey: record.code
        })
    }

    isEditing = (record) => {
        const { editingKey } = this.state
        return record.code === editingKey;
    }

    handleCancel = () => {
        this.setState({
            editingKey: ''
        })
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
            <PageHeaderWrapper title="Product Groups">
                <Card bordered={false}>
                    <div>
                        <div className={styles.tableListOperator}>
                            <span>
                                <Button type="primary" onClick={this.handleAdd}>
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

export default connect(({ productGroup }) => ({
    productGroup,
}))(ProductGroups);