import React, { PureComponent, Fragment } from 'react';
import { Table, Alert } from 'antd';
import styles from './index.less';

class StandardTable extends PureComponent {
    constructor(props) {
        super(props);
    }

    handleTableChange = (pagination, filters, sorter) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(pagination, filters, sorter);
        }
    };

    cleanSelectedKeys = () => {
        this.handleRowSelectChange([], []);
    };

    render() {
        const { data = [], rowKey, components, ...rest } = this.props;
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
                    components={components}
                    rowKey={rowKey || 'id'}
                    dataSource={data}
                    pagination={paginationProps}
                    onChange={this.handleTableChange}
                    {...rest}
                />
            </div>
        );
    }
}

export default StandardTable;
