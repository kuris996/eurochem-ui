import React, { PureComponent } from 'react'
import PageHeaderWrapper from '../PageHeaderWrapper'
import StandardTable from '../StandardTable'
import StandardButtonBox from '../StandardButtonBox'
import {
    Card,
    Form,
    Modal
} from 'antd';

import styles from './index.less';

class StandardPage extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0
            },
            modalVisible: false,
            current: undefined
        }
        
        this.formRef = React.createRef()
    }

    componentDidMount() {
        this.handleRefresh()
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

    handleStandardTableChange=(pagination, filtersArg, sorter) => { 
        const { onFetchData } = this.props
        const params = { offset: (pagination.current - 1) * 10, limit: 10 }
        onFetchData(params);
    }

    handleAdd = (item) => {
        this.setState({
            modalVisible: true,
            current: undefined
        })
    }

    handleUpdate = (item) => {
        this.setState({
            modalVisible: true,
            current: item
        })
    }

    handleRemove = (item) => {
        const { onRemove } = this.props;
        if (onRemove)
            onRemove(item)
    }

    handleSubmit = (e) => {
        const { onAdd, onUpdate } = this.props
        const { current } = this.state
        e.preventDefault();
        const id = current ? current.id : '';
        this.formRef.current.validateFields().then(fields => { 
            if (current === undefined) {
                if (onAdd)
                    onAdd(fields)
            } else {
                if (onUpdate)
                    onUpdate({id, ...fields})
            }

            this.setState({
                modalVisible: false
            })
        })
        .catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });
    }

    handleCancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    
    handleRefresh = () => {
        const { pagination } = this.state
        this.handleStandardTableChange(pagination)
    }
   
    render() {
        const { title, rowKey = rowKey || 'id', extraOperations, onAddRow, formContent, formTitle, initialValues,  ...rest } = this.props;
        const { data, pagination, modalVisible, current = {} } = this.state
        return (
            <PageHeaderWrapper title={title}>
                <Card bordered={false}>
                    <div>
                        <StandardButtonBox
                            onAdd={this.handleAdd}
                            onRefresh={this.handleRefresh}
                        />
                        <StandardTable 
                            rowKey={rowKey}
                            data={data}
                            pagination={pagination}
                            onChange={this.handleStandardTableChange}
                            onUpdateRow={this.handleUpdate}
                            onRemoveRow={this.handleRemove}
                            extraOperations={extraOperations}
                            {...rest} 
                        />
                    </div>
                </Card>
                <Modal
                    title={formTitle(current)}
                    className={styles.standardPageForm}
                    width={640}
                    bodyStyle={{ padding: '28px 0 0' }}
                    destroyOnClose
                    visible={modalVisible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <Form ref={this.formRef} onSubmit={this.handleSumbit} initialValues={initialValues}>
                        {formContent(current )}
                    </Form>
                </Modal>
            </PageHeaderWrapper>
        )
    }
}

export default StandardPage;