import React, { Component } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import styles from './Header.less';
import TopNavHeader from '@/components/TopNavHeader';

const { Header } = Layout;

class HeaderView extends Component {
    state = {
        visible: true,
    };

    getHeadWidth = () => {
        return 'calc(100% - 192px)';
    }

    render() {
        const { visible } = this.state
        const width = this.getHeadWidth();
        const headerView = visible ? (
            <Header 
                style={{ padding: 0, width, zIndex: 2 }}
                className={styles.fixedHeader}
            > 
                <TopNavHeader
                    mode="horizontal"
                    {...this.props} 
                />
            </Header>
        ) : null;
        return (
            <Animate component="" transitionName="fade">
                {headerView}
            </Animate>
        )
    }
}

export default (HeaderView);