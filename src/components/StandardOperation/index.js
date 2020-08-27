import React, { PureComponent } from 'react'
import {
    Button,
    Modal,
    Popconfirm,
} from 'antd';
import { 
    DeleteOutlined, 
    EditOutlined 
} from '@ant-design/icons';

import styles from './index.less'

class StandardOperation extends PureComponent {
    render() {
        const { record, onUpdateRow, onRemoveRow, extraOperations } = this.props

        const removeConfirm = (record) => {
              Modal.confirm({
                title: 'Remove',
                content: 'Sure to Remove？',
                okText: 'Yes',
                cancelText: 'No',
                onOk: () => onRemoveRow(record),
            });
        };

        return (
            <span className={styles.standardOperation}>
                <Button onClick={() => { onUpdateRow(record) }}>
                    <EditOutlined/>
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => { removeConfirm(record) }}>
                    <DeleteOutlined/>
                </Button>
                { extraOperations && extraOperations(record) }
            </span>
        )
    }
}

export default StandardOperation;