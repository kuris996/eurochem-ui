import React, { PureComponent } from 'react';
import styles from './index.less';

export default class RightContent extends PureComponent {
    render() {
        let className = styles.right
        return (
            <div className={className}>
            </div>
        )
    }
}