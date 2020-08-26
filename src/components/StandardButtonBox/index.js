import React, { PureComponent } from 'react'
import { 
    PlusOutlined, 
    ExportOutlined, 
    ImportOutlined,
    ReloadOutlined, 
} from '@ant-design/icons';
import {
    Button,
} from 'antd';

import styles from './index.less'

class StandardButtonBox extends PureComponent {
    render() {
        const { onAdd, onRefresh } = this.props;
        return (
            <div className={styles.tableListOperator}>
                <span>
                    <Button type="primary" onClick={() => onAdd()}>
                        <PlusOutlined/> Add
                    </Button>
                    <Button type="primary" onClick={() => onRefresh()}>
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
        )
    }
}

export default StandardButtonBox;