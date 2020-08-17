import React from 'react';
import { connect } from 'dva';
import StandardPage from '@/components/StandardPage';

class DistanceUnits extends React.Component {

    formRef = React.createRef();

    constructor(props) {
        super(props)
    
        this.columns = [   
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
    }

    newRow = () => {
        return {
            code: '',
            local_name: '',
            en_name: ''
        }
    }

    addRow = (payload, callback) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'distanceUnit/add',
            payload,
            callback,
        })
    }

    updateRow = (payload, callback) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'distanceUnit/update',
            payload,
            callback,
        })
    }

    removeRow = (payload, callback) => {
        const { dispatch } = this.props;
        dispatch({
            type: 'distanceUnit/remove',
            payload,
            callback
        })
    }

    fetchData = (callback) => {
        const { dispatch } = this.props;
        const params = { offset: 0, limit: 100 }
        dispatch({
            type: 'distanceUnit/fetch',
            payload: {...params},
            callback,
        })
    }

    render() {
        return (
            <StandardPage 
                title="Distance Units" 
                columns={this.columns}
                formRef={this.formRef}
                rowKey="code"
                newRow={this.newRow}
                addRow={this.addRow}
                updateRow={this.updateRow}
                removeRow={this.removeRow}
                fetchData={this.fetchData}
            />
        )
    }
}

export default connect(({ distanceUnit }) => ({
    distanceUnit,
}))(DistanceUnits);