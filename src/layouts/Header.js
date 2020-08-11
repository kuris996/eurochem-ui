import React, { Component } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import styles from './Header.less';
import TopNavHeader from '@/components/TopNavHeader';
import { connect } from 'dva';

const { Header } = Layout;

class HeaderView extends Component {
    state = {
        visible: true,
    };

    render() {
        const { setting } = this.props;
        const { navTheme, fixedHeader } = setting;
        const { visible } = this.state
        const headerView = visible ? (
            <Header 
                style={{ padding: 0, width: 'calc(100% - 192px)', zIndex: 2 }}
                className={fixedHeader ? styles.fixedHeader : ''}
            > 
                <TopNavHeader
                    theme={navTheme}
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

export default connect(({ setting }) => ({   
    setting,
}))(HeaderView);