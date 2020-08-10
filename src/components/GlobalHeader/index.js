import React, { PureComponent } from 'react';
import Link from 'umi/link';
import styles from './index.less';
import RightContent from '../RightContent';
import Logo from '../Logo';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

export default class GlobalHeader extends PureComponent {
    /* eslint-disable*/
    triggerResizeEvent() {
        // eslint-disable-line
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }

    render() {
        return (
            <div className={styles.header}>
            </div>
        );
    }
}