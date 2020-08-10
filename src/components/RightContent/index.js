import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.less';

export default class RightContent extends PureComponent {
    render() {
        let className = styles.right
        return (
            <div className={className}>
                <Tooltip title="Инструкция" >
                    <a style={{ marginLeft: 8, marginRight: 16, fontSize: 18, color: '#fff' }} 
                        target="_blank"
                        href="/docs/getting-started/"
                        rel="noopener noreferrer"
                        className={styles.action}
                    >
                        <QuestionCircleOutlined />
                    </a>
                </Tooltip>
            </div>
        )
    }
}