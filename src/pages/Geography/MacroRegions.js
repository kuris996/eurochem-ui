import React from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components//PageHeaderWrapper'
import StandardTable from '@/components//StandardTable'
import StandardButtonBox from '@/components/StandardButtonBox'
import { 
    Switch, 
    Button,
    Form,
    Input,
    Modal,
    Card
} from 'antd';
import { 
    PlusOutlined,
} from '@ant-design/icons';

class MacroRegions extends React.Component {

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
    }

    componentDidMount() {
        this.handleRefresh()
    }    

    getFormTitle = (current) => {
        return !current.id ? "Add Macro Region" : "Edit Macro Region"
    }

    getFormContent = (current) => {
        const { parent } = this.state
        if (parent === undefined) {
            return (
                <>
                <Form.Item 
                    name="code" 
                    label="Code:"
                    {...this.formLayout}
                    initialValue={current.code}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
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
                    name="description" 
                    label="Description:"
                    {...this.formLayout}
                    initialValue={current.description}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    valuePropName="checked"
                    name="monthly_data" 
                    label="Monthly Data:"
                    {...this.formLayout}
                    initialValue={current.monthly_data}
                    rules={[{ required: false }]}
                >
                    <Switch />
                </Form.Item>
            </>
            )
        }
        return this.getLevelFormContent()
    }

    getLevelFormContent = (current = {}) => {
        return (
            <>
                <Form.Item 
                    name="level" 
                    label="Level:"
                    {...this.formLayout}
                    initialValue={current.level}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
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
                    name="description" 
                    label="Description:"
                    {...this.formLayout}
                    initialValue={current.description}
                    rules={[{ required: false }]}
                >
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
        const { parent } = this.state
        if (parent !== undefined)
            payload = ({ ...parent, levels: [...parent.levels, payload] })
        else
            payload = ({ ...payload, levels: [] })
        dispatch({
            type: 'macroRegion/add',
            payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleUpdateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/update',
            payload,
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleRemoveRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/remove',
            payload: payload['id'],
            callback: (function(error, data, response) {
                this.handleRefresh()
            }).bind(this)
        })
    }

    handleFetchData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.setState({
                    data: data.data,
                    pagination: {
                        current: (data.offset / 10) + 1,
                        pageSize: data.limit,
                        total: data.total
                    },
                    parent: undefined
                })
            }).bind(this)
        })
    }

    handleCancel = () => {
        this.setState({
            parent: undefined
        })
    }

    addLevel = (record) => {
        this.setState({
            parent: record
        })
        this.handleAdd(record)
    }

    render() {
        const columns = [   
            {
                title: 'Macro Code',
                dataIndex: 'code',
                width: 100,
            },         
            {
                title: 'Local Name',
                dataIndex: 'local_name',
                width: 200,
            },
            {
                title: 'En Name',
                dataIndex: 'en_name',
                width: 200,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                width: 200,
            },
            {
                title: 'Monthly',
                dataIndex: 'monthly_data',
                width: 100,
                render: (text, record) => (
                    <span><Switch disabled={true} checked={record.monthly_data} /></span>
                ),
            },
        ]

        const expandedRowRender = (record) => {
            const columns = [
              { title: 'Level', dataIndex: 'level', key: 'level', width: 100 },
              { title: 'Local Name', dataIndex: 'local_name', key: 'local_name', width: 150 },
              { title: 'En Name', dataIndex: 'en_name', key: 'en_name', width: 150 },
              { title: 'Description', dataIndex: 'description', key: 'description', width: 150 },
            ];        
            
            const { levels = {} } = record
                        
            const getFormLevelTitle = (current) => {
                return "Edit Level"
            }

            const handleRemoveLevel = (level, record) => {
                const val = record.levels.find(l => l.level === level.level)
                const index = record.levels.indexOf(val)
                if (index >= 0) {
                    record.levels.splice(index, 1)
                }
                this.handleUpdateRow(record)
            }

            const handleUpdateLevel = (level, record) => {
                const val = record.levels.find(l => l.level === level.level)
                const index = record.levels.indexOf(val)
                if (index >= 0) {
                    record.levels[index] = level
                }
                this.handleUpdateRow(record)
            }

            return (
                <div>
                    <StandardTable 
                        columns={columns}
                        rowKey="id"
                        data={levels}
                        pagination={false}
                        formTitle={current => getFormLevelTitle(current)}
                        formContent={this.getLevelFormContent}
                        onRemove={level => handleRemoveLevel(level, record)}
                        onUpdate={level => handleUpdateLevel(level, record)}
                    />
                </div>
            );
        }

        const { data, pagination } = this.state;

        const extraOperations = (record) => {
            return (
                <Button style={{ marginLeft: 8 }} onClick={() => this.addLevel(record)}>
                    <PlusOutlined/>
                </Button>
            )
        }

        return (
            <PageHeaderWrapper title="Macro Regions" >
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
                            onCancel={this.handleCancel}
                            onFetchData={this.handleFetchData}
                            expandedRowRender={record => expandedRowRender(record)}
                            extraOperations={record => extraOperations(record)}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>            
        )        
    }
}

export default connect(({ macroRegion }) => ({
    macroRegion,
}))(MacroRegions);