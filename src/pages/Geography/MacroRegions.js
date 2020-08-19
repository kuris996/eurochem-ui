import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';
import StandardTable from '@/components/StandardTable';
import { Switch, Table, Button } from 'antd';
import { 
    PlusOutlined,
} from '@ant-design/icons';

class MacroRegions extends React.Component {

    formRef = React.createRef();

    state = {
        data: []
    }

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

    addRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/add',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    updateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/update',
            payload,
            id: payload.id,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    removeRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'macroRegion/remove',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    fetchData = () => {
        const { dispatch } = this.props;
        const params = { offset: 0, limit: 100 }
        dispatch({
            type: 'macroRegion/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.setState({ data: data.data })
            }).bind(this)
        })
    }

    addLevel = (record) => {
        const { data } = this.state
        record.levels = [...record.levels, {
            level: '',
            local_name: '',
            en_name: '',
            description: ''
        }]
        this.setState({
            data: [...data]
        })
        console.log(record, this)
    }

    render() {
        const columns = [   
            {
                title: 'Macro Code',
                dataIndex: 'code',
                editable: true,
                inputType: 'text',
                width: 100,
            },         
            {
                title: 'Local Name',
                dataIndex: 'local_name',
                editable: true,
                inputType: 'text',
                width: 200,
            },
            {
                title: 'En Name',
                dataIndex: 'en_name',
                editable: true,
                inputType: 'text',
                width: 200,
            },
            {
                title: 'Description',
                dataIndex: 'description',
                editable: true,
                inputType: 'text',
                width: 200,
            },
            {
                title: 'Monthly',
                dataIndex: 'monthly_data',
                editable: true,
                inputType: 'switch',
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
            
            return (
                <StandardTable 
                    rowKey={'id'}
                    columns={columns} 
                    data={levels}
                    isEditing={ () => {} }
                    scroll={{ x: 'max-content' }}
                />
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
                title="Macro Regions" 
                columns={columns}
                formRef={this.formRef}
                data={this.state.data}
                rowKey="id"
                newRow={this.newRow}
                addRow={this.addRow}
                updateRow={this.updateRow}
                removeRow={this.removeRow}
                fetchData={this.fetchData}
                expandedRowRender={record => expandedRowRender(record)}
                extraOperations={record => extraOperations(record)}
                initialValues={{
                    ['monthly_data']: false
                }}
            />
        )
        
    }
}

export default connect(({ macroRegion }) => ({
    macroRegion,
}))(MacroRegions);