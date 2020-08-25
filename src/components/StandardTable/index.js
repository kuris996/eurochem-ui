import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';
import StandardOperation from '../StandardOperation'

class StandardTable extends PureComponent {

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    render() {
        const { data, rowKey, columns, pagination, extraOperations, ...rest } = this.props;

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
                    onChange={this.handleTableChange}
                    columns={newColumns}
                    scroll={{ x: 'max-content' }}
                    {...rest}
                />
            </div>
        );
    }
}

export default StandardTable;
