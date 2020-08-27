import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components//PageHeaderWrapper'
import StandardTable from '@/components//StandardTable'
import StandardButtonBox from '@/components//StandardButtonBox' 
import {
    Button,
    Select,
    Input,
    Form,
    Card
} from 'antd';
import { 
    PlusOutlined,
} from '@ant-design/icons';

const { Option } = Select;

class Products extends React.Component {

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
        parent: undefined,
        productGroups: [],
    }

    componentDidMount() {
        this.handleRefresh()
    } 

    getFormTitle = (current) => {
        return !current.id ? "Add Product" : "Edit Product"
    }

    getFormContent = (current) => {
        const { productGroups } = this.state;
        return (
            <>
                <Form.Item 
                    name="local_name" 
                    label="Local Name:"
                    {...this.formLayout}
                    initialValue={current.local_name}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    name="en_name" 
                    label="En Name:"
                    {...this.formLayout}
                    initialValue={current.en_name}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="product_group_code"
                    label="Product Group Code:"
                    {...this.formLayout}
                    initialValue={current.product_group_code}
                    rules={[{ required: true }]}
                >
                    <Select>
                        { productGroups.map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="product_type"
                    label="Product Type"
                    {...this.formLayout}
                    initialValue={current.product_type}
                    rules={[{ required: true }]}
                >
                    <Select>
                        { ['liquid', 'bulk'].map(item => (
                            <Option value={item}>{item}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    name="tn_ved_code"
                    label="Tn Ved Code"
                    {...this.formLayout}
                    initialValue={current.tn_ved_code}
                    rules={[{ required: true }]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    name="rail_code"
                    label="Rail Code"
                    {...this.formLayout}
                    initialValue={current.rail_code}
                    rules={[{ required: true }]}
                >
                    <Input/>
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
        const { parent } = this.state;
        if (parent !== undefined)
            payload = ({ parent_id: parent.id, ...payload  })
        dispatch({
            type: 'product/add',
            payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleUpdateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'product/update',
            payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleRemoveRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'product/remove',
            payload: payload['id'],
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }
    
    convertListToTree = (items, id = null, link = 'parent_id') => items
        .filter(item => item[link] === id)
        .map(item => ({ ...item, children: this.convertListToTree(items, item.id) }))

    handleFetchData = (params) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'product/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.setState({
                    data: this.convertListToTree(data.data),
                    pagination: {
                        current: (data.offset / 10) + 1,
                        pageSize: data.limit,
                        total: data.total
                    },
                    parent: undefined,
                })
            }).bind(this)
        })

        dispatch({
            type: 'productGroup/fetch',
            payload: { offset: 0, limit: 100000 },
            callback: (function(error, data, response) {
                this.setState({
                    productGroups: data.data.map(item => item.code)
                })
            }).bind(this)
        })
    }

    addChildRow = (record) => {
        this.setState({
            parent: record
        })
        this.handleAdd()
    }

    render() {
        const columns = [ 
            {
                title: 'Local Name',
                dataIndex: 'local_name',
                key: 'local_name',
                width: 100,
            },
            {
                title: 'En Name',
                dataIndex: 'en_name',
                key: 'en_name',
                width: 100,
            },
            {
                title: 'Product Group',
                dataIndex: 'product_group_code',
                key: 'product_group_code',
                width: 100,
            },
            {
                title: 'Product Type',
                dataIndex: 'product_type',
                key: 'product_type',
                width: 100,
            },
            {
                title: 'Tn Ved Code',
                dataIndex: 'tn_ved_code',
                key: 'tn_ved_code',
                width: 100,
            },
            {
                title: 'Rail Code',
                dataIndex: 'rail_code',
                key: 'rail_code',
                width: 100,
            },
        ]

        const { data, pagination } = this.state;

        const extraOperations = (record) => {
            return (
                <Button style={{ marginLeft: 8 }} onClick={() => this.addChildRow(record)}>
                    <PlusOutlined/>
                </Button>
            )
        }

        return (
            <PageHeaderWrapper title="Products" >
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
                            extraOperations={(record) => extraOperations(record)}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        )    
    }
}

export default connect(({ product, productGroup }) => ({
    product,
    productGroup,
}))(Products);