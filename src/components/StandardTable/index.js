import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
    
    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    render() {
        const { data = [], rowKey, ...rest } = this.props;
        const { pagination } = data;

        const paginationProps = {
            showSizeChanger: true,
            showQuickJumper: true,
            ...pagination,
        };

        return (
            <div className={styles.standardTable}>
                <Table
                    bordered
                    rowKey={rowKey || 'id'}
                    dataSource={data}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    size="small"
                    {...rest}
                />
            </div>
        );
    }
}

export default StandardTable;
