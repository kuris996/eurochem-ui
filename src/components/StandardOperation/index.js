import React, { PureComponent } from 'react'
import {
    Button,
    Popconfirm,
} from 'antd';
import { 
    CloseCircleOutlined, 
    SaveOutlined, 
    DeleteOutlined, 
    EditOutlined 
} from '@ant-design/icons';

import styles from './index.less'

class StandardOperation extends React.Component {
    render() {
        const { record, isEditing, onEdit, onRemove, onSave, onCancel, extraOperations } = this.props
        return !isEditing(record) ? (
            <span className={styles.standardOperation}>
                <Button onClick={() => { onEdit(record) }}>
                    <EditOutlined/>
                </Button>
                <Popconfirm title="Sure to Remove?" onConfirm={() => { onRemove(record) }}>
                    <Button style={{ marginLeft: 8 }}>
                        <DeleteOutlined/>
                    </Button>
                </Popconfirm>
                { extraOperations && extraOperations(record) }
            </span>
        ) : (
            <span className={styles.standardOperation}>
                <Button onClick={() => { onSave(record) }}>
                    <SaveOutlined/>
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={() => { onCancel(record) }}>
                    <CloseCircleOutlined/>
                </Button>
            </span>
        )
    }
}

export default StandardOperation;