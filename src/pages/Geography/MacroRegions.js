import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';
import StandardTable from '@/components/StandardTable';
import { 
    Switch, 
    Button,
    Form,
    Input,
    Modal
} from 'antd';
import { 
    PlusOutlined,
} from '@ant-design/icons';

import styles from '@/components/StandardPage/index.less'

class MacroRegions extends React.Component {

    pageRef = React.createRef();
    formRef = React.createRef();

    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 },
    };

    state = {
        parent: undefined,
        modalVisible: false,
    }
    /*
    newRow = () => {
        const row = {
            id: '',
            code: '',
            local_name: '',
            en_name: '',
            description: '',
            monthly_data: false,
            levels: []
        }
        const { data } = this.state;
        this.setState({
            data: [...data, row]
        })
    }
    */

    getFormTitle = (current) => {
        return !current.id ? "Add Macro Region" : "Edit Macro Region"
    }

    getFormContent = (current) => {
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

    handleAddRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/add',
            payload: ({ ...payload, levels: [] }),
            callback: (function(error, data, response) {
                this.pageRef.current.handleRefresh()
            }).bind(this)
        })
    }

    handleUpdateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/update',
            payload,
            callback: (function(error, data, response) {
                this.pageRef.current.handleRefresh()
            }).bind(this)
        })
    }

    handleRemoveRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/remove',
            payload: payload['id'],
            callback: (function(error, data, response) {
                this.pageRef.current.handleRefresh()
            }).bind(this)
        })
    }

    handleFetchData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.pageRef.current.setData(data)
            }).bind(this)
        })
    }

    addLevel = (record) => {
        this.setState({
            modalVisible: true,
            parent: record
        })
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
        
            const { levels } = record
            const { modalVisible } = this.state
            
            return (
                <div>
                    <StandardTable 
                        rowKey={'id'}
                        columns={columns} 
                        data={levels}
                    />
                    <Modal
                        className={styles.standardPageForm}
                        width={640}
                        bodyStyle={{ padding: '28px 0 0' }}
                        destroyOnClose
                        visible={modalVisible}
                    >
                        <Form ref={this.formRef}>
                            <Form.Item 
                                name="level" 
                                label="Level:"
                                {...this.formLayout}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="local_name" 
                                label="Local Name:"
                                {...this.formLayout}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="en_name" 
                                label="En Name:"
                                {...this.formLayout}
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                name="description" 
                                label="Description:"
                                {...this.formLayout}
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            );
        }

        const extraOperations = (record) => {
            return (
                <Button style={{ marginLeft: 8 }} onClick={() => this.addLevel(record)}>
                    <PlusOutlined/>
                </Button>
            )
        }

        return (
            <StandardPage 
                ref={this.pageRef}
                title="Macro Regions" 
                columns={columns}
                rowKey="id"
                formTitle={this.getFormTitle}
                formContent={this.getFormContent}
                onAdd={this.handleAddRow}
                onUpdate={this.handleUpdateRow}
                onRemove={this.handleRemoveRow}
                onFetchData={this.handleFetchData}
                expandedRowRender={record => expandedRowRender(record)}
                extraOperations={record => extraOperations(record)}
            />
        )
        
    }
}

export default connect(({ macroRegion }) => ({
    macroRegion,
}))(MacroRegions);