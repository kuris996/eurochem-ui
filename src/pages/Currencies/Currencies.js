import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';

class Currencies extends React.Component {

    formRef = React.createRef();

    state = {
        data: []
    }

    newRow = () => {
        const row = {
            id: '',
            code: '',
            local_name: '',
            en_name: ''
        }
        const { data } = this.state;
        this.setState({
            data: [...data, row]
        })
    }

    addRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'currency/add',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    updateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'currency/update',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    removeRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'currency/remove',
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
            type: 'currency/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.setState({ data: data.data })
            }).bind(this)
        })
    }

    render() {
        const columns = [   
            {
                title: 'Code',
                dataIndex: 'code',
                key: 'code',
                editable: true,
                width: 100,
            },         
            {
                title: 'Local Name',
                dataIndex: 'local_name',
                key: 'local_name',
                editable: true,
                width: 150,
            },
            {
                title: 'En Name',
                dataIndex: 'en_name',
                key: 'en_name',
                editable: true,
                width: 150,
            },
        ]

        return (
            <StandardPage 
                title="Currency" 
                columns={columns}
                formRef={this.formRef}
                data={this.state.data}
                rowKey="id"
                newRow={this.newRow}
                addRow={this.addRow}
                updateRow={this.updateRow}
                removeRow={this.removeRow}
                fetchData={this.fetchData}
            />
        )        
    }
}

export default connect(({ currency }) => ({
    currency,
}))(Currencies);