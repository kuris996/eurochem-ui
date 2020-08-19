import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';

class ProductGroups extends React.Component {

    formRef = React.createRef();

    state = {
        data: []
    }

    newRow = () => {
        const row = {
            id: '',
            code: '',
            description: '',
        }
        const { data } = this.state;
        this.setState({
            data: [...data, row]
        })
    }

    addRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/add',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    updateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/update',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    removeRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/remove',
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
            type: 'productGroup/fetch',
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
                width: 100
            },
            {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                editable: true,
                width: 200
            },
        ]

        return (
            <StandardPage 
                title="Product Groups" 
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

export default connect(({ productGroup }) => ({
    productGroup,
}))(ProductGroups);