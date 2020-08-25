import React, { PureComponent } from 'react'
import {
    Button,
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
        return (
            <span className={styles.standardOperation}>
                <Button onClick={() => { onUpdateRow(record) }}>
                    <EditOutlined/>
                </Button>
                <Popconfirm title="Sure to Remove?" onConfirm={() => { onRemoveRow(record) }}>
                    <Button style={{ marginLeft: 8 }}>
                        <DeleteOutlined/>
                    </Button>
                </Popconfirm>
                { extraOperations && extraOperations(record) }
            </span>
        )
    }
}

export default StandardOperation;