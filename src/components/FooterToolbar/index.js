import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.less';

export default class FooterToolbar extends Component {
    static contextTypes = {
        isMobile: PropTypes.bool,
    };

    render() {
        const { children, className, extra, ...restProps } = this.props;
        return (
            <div className={classNames(className, styles.toolbar)} {...restProps}>
                <div className={styles.left}>{extra}</div>
                <div className={styles.right}>{children}</div>
            </div>
        );
    }
}