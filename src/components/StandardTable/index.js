import React, { PureComponent } from 'react';
import { 
    Table,
    Form,
    Modal 
} from 'antd';
import styles from './index.less';
import StandardOperation from '../StandardOperation'

class StandardTable extends PureComponent {

    state = {
        data: [],
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0
        },
        modalVisible: false,
        current: undefined
    }

    formRef = React.createRef()

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

    add = (item) => {
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
    
    refreshData = () => {
        const { pagination } = this.state
        this.handleStandardTableChange(pagination)
    }

    render() {
        const { rowKey = rowKey || 'id', columns, extraOperations, formContent, formTitle, initialValues, ...rest } = this.props;
        const { data, pagination, modalVisible, current = {} } = this.state

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination
        };

        var newColumns = [...columns, {
            editable: false,
            fixed: 'right',
            width: 150,
            render: (text, record) => {
                return (
                    <StandardOperation 
                        text={text} 
                        record={record}
                        extraOperations={extraOperations}
                        onRemoveRow={this.handleRemove}
                        onUpdateRow={this.handleUpdate}
                        {...rest}
                    />
                )
            }
        }]
        
        return (
            <div className={styles.standardTable}>
                <Table
                    bordered
                    rowKey={rowKey || 'id'}
                    dataSource={data}
                    pagination={paginationProps}
                    onChange={this.handleStandardTableChange}
                    columns={newColumns}
                    scroll={{ x: 'max-content' }}
                    {...rest}
                />
                <Modal
                    title={formTitle(current)}
                    className={styles.standardTableForm}
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
            </div>
        );
    }
}

export default StandardTable;
