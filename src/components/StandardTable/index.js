import React, { PureComponent } from 'react';
import { 
    Table,
    Form,
    Modal,
    Result,
    Button
} from 'antd';
import styles from './index.less';
import StandardOperation from '../StandardOperation'

class StandardTable extends PureComponent {

    state = {
        modalVisible: false,
        current: undefined,
        done: false
    }

    formRef = React.createRef()

    handleStandardTableChange = (pagination, filtersArg, sorter) => { 
        const { onFetchData } = this.props
        const params = { offset: (pagination.current - 1) * 10, limit: 10 }
        onFetchData(params);
    }

    addRecord = (item) => {
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
                done: true
            })
        })
        .catch(errorInfo => {
            console.log('Validate Failed:', errorInfo);
        });
    }

    handleCancel = () => {
        const { onCancel } = this.props;
        this.setState({
            modalVisible: false
        })
        if (onCancel)
            onCancel()
    }

    handleDone = () => {
        this.setState({
            done: false,
            modalVisible: false,
        });
    }
    
    render() {
        const { data = [], pagination, rowKey = rowKey || 'id', columns, extraOperations, formContent, formTitle, initialValues, ...rest } = this.props;
        const { modalVisible, current = {}, done } = this.state

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

        const modalFooter = done
        ? { footer: null, onCancel: this.handleDone }
        : { okText: 'OK', onOk: this.handleSubmit, onCancel: this.handleCancel };

        const doneContent = () => {
            return (
                <Result
                    status="success"
                    title="Successfully Completed"
                    extra={
                    <Button type="primary" onClick={this.handleDone}>
                        Done
                    </Button>
                    }
                    className={styles.formResult}
                />
            );
        }
        
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
                    title={done ? null : formTitle(current)}
                    className={styles.standardTableForm}
                    width={640}
                    bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
                    destroyOnClose
                    visible={modalVisible}
                    {...modalFooter}
                >
                    <Form ref={this.formRef} onSubmit={this.handleSumbit} initialValues={initialValues}>
                        {done ? doneContent() : formContent(current )}
                    </Form>
                </Modal>
            </div>
        );
    }
}

export default StandardTable;
