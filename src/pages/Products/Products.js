import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';
import {
    Button,
} from 'antd';

class Products extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            productGroups: []
        }
    }

    newRow = () => {
        const row = {
            id: '',
            local_name: '',
            en_name: '',
            product_group_code: '',
            product_type: '',
            tn_ved_code: '',
            rail_code: '',
        }
        const { data } = this.state;
        this.setState({
            data: [...data, row]
        })
    }

    addRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'product/add',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    updateRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'product/update',
            payload,
            callback: (function(error, data, response) {
                this.fetchData()
            }).bind(this)
        })
    }

    removeRow = (payload) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'product/remove',
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
            type: 'product/fetch',
            payload: {...params},
            callback: (function(error, data, response) {                
                this.setState({ data: data.data })
            }).bind(this)
        })

        dispatch({
            type: 'productGroup/fetch',
            payload: { ...params },
            callback: (function(error, data, response) {
                this.setState({
                    productGroups: data.data.map(item => item.code)
                })
            }).bind(this)
        })
    }

    addChild = (record) => {
    }

    extraOperations = (record) => {
        return (
            <Button style={{ marginLeft: 8 }} onClick={() => this.addChild(record)}>Add</Button>
        )
    }

    render() {
        const { productGroups } = this.state

        const columns = [ 
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
                inputType: 'select',
                options: productGroups,
                width: 100,
            },
            {
                title: 'Product Type',
                dataIndex: 'product_type',
                key: 'product_type',
                editable: true,
                inputType: 'select',
                options: ['liquid', 'bulk'],
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
        ]

        return (
            <StandardPage 
                title="Products" 
                columns={columns}
                formRef={this.formRef}
                data={this.state.data}
                rowKey="id"
                newRow={this.newRow}
                addRow={this.addRow}
                updateRow={this.updateRow}
                removeRow={this.removeRow}
                fetchData={this.fetchData}
                extraOperations={this.extraOperations}
            />
        )    
    }
}

export default connect(({ product, productGroup }) => ({
    product,
    productGroup,
}))(Products);