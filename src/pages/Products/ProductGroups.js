import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';

class ProductGroups extends React.Component {

    pageRef = React.createRef();

    newRow = () => {
        return {
            id: '',
            code: '',
            description: '',
        }
    }

    addRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/add',
            payload: payload,
            callback: (function(error, data, response) {
                this.pageRef.current.updateData()
            }).bind(this)
        })
    }

    updateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/update',
            payload,
            id: payload['id'],
            callback: (function(error, data, response) {
                this.pageRef.current.updateData()
            }).bind(this)
        })
    }

    removeRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/remove',
            payload: payload['id'],
            callback: (function(error, data, response) {
                this.pageRef.current.updateData()
            }).bind(this)
        })
    }

    fetchData = (params) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'productGroup/fetch',
            payload: {...params},
            callback: (function(error, data, response) {
                this.pageRef.current.setData(data)
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
                ref={this.pageRef}
                title="Product Groups" 
                columns={columns}
                formRef={this.formRef}
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