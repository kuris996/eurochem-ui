import React from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import Context from './MenuContext';
import SiderMenu from '@/components/SiderMenu'
import Header from './Header';
import styles from './BasicLayout.less';

const { Content } = Layout;

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};

class BasicLayout extends React.Component {
    state = {
        sideMenu: []
    };

    componentDidMount() {
        const {
            dispatch,
            route: { routes, path },
        } = this.props;
        dispatch({
            type: 'setting/getSetting',
        })
        dispatch({
            type: 'menu/getMenuData',
            payload: { routes, path },
        })
    }

    getContext() {
        const { location, breadcrumbNameMap } = this.props;
        return {
            location,
            breadcrumbNameMap
        }
    }

    getLayoutStyle = () => {
        return {
            paddingLeft: '256px'
        }
    }

    render() {
        const {
            navTheme,
            children,
            menuData,
            breadcrumbNameMap,
            fixedHeader,
        } = this.props

        const {
            sideMenu
        } = this.state

        const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
        const layout = (
            <Layout>
                <SiderMenu
                    theme={navTheme}
                    sideMenu={sideMenu}
                    {...this.props}
                />
                <Layout
                    style={{
                        ...this.getLayoutStyle(),
                        minHeight: '100vh'
                    }}
                >
                    
                    <Header
                        menuData={menuData} 
                        {...this.props}
                    />
                    <Content className={styles.content} style={contentStyle}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <React.Fragment>
                <DocumentTitle title={"Eurochem"}>
                    <ContainerQuery query={query}>
                        {params => (
                            <Context.Provider value={this.getContext()}>
                                <div className={classNames(params)}>{layout}</div>
                            </Context.Provider>
                        )}
                    </ContainerQuery>
                </DocumentTitle>
            </React.Fragment>
        )
    }
}

export default connect(({ setting, menu: menuModel }) => ({
    menuData: menuModel.menuData,
    breadcrumbNameMap: menuModel.breadcrumbNameMap,
    ...setting
}))(props => (
    <BasicLayout {...props} />
));