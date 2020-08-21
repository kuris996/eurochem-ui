import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../PageHeaderWrapper'
import StandardTable from '../StandardTable'
import StandardOperation from '../StandardOperation'
import {
    Card,
    Button,
    Form,
} from 'antd';
import { 
    PlusOutlined, 
    ExportOutlined, 
    ImportOutlined,
    ReloadOutlined, 
} from '@ant-design/icons';

import styles from './index.less';

class StandardPage extends PureComponent
{
    constructor(props) {
        super(props);

        this.tableRef = React.createRef();

        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            }
        }
    }

    setData = (data) => {
        this.setState({
            data: data.data,
            pagination: {
                current: (data.offset / 10) + 1,
                pageSize: data.limit,
                total: data.total
            }
        })
    }

    updateData = () => {
        const { pagination } = this.state
        this.handleStandardTableChange(pagination)
    }

    handleStandardTableChange=(pagination, filtersArg, sorter) => { 
        const { fetchData } = this.props
        const params = { offset: (pagination.current - 1) * 10, limit: 10 }
        fetchData(params);
    }
    
    handleAdd = () => {
        const { newRow } = this.props;
        const { data, pagination } = this.state;
        const current = parseInt(pagination.total / 10) + 1
        this.setState({
            data: [...data, newRow()],
            pagination: {
                current: current,
                pageSize: 10,
                total: pagination.total + 1
            }
        })
        this.tableRef.current.setEditingKey('')
    }

    handleCancel = (recored) => {

    }

    handleRefresh = () => {
        const { fetchData } = this.props
        const params = { offset: 0, limit: 10 }
        fetchData(params);
    }
   
    render() {
        const { title, rowKey = rowKey || 'id', initialValues, extraOperations, ...rest } = this.props;
        const { data, pagination } = this.state
        return (
            <PageHeaderWrapper title={title}>
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
                        <StandardTable 
                            ref={this.tableRef}
                            rowKey={rowKey}
                            data={data}
                            pagination={pagination}
                            extraOperations={extraOperations}
                            scroll={{ x: 'max-content' }}
                            onChange={this.handleStandardTableChange}
                            onCancel={this.handleCancel}
                            editable={true}
                            {...rest} 
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default StandardPage;