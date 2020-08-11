import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import classNames from 'classnames';
import Link from 'umi/link';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils'
import styles from './index.less';
import { title } from '../../defaultSettings';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

export default class SiderMenu extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openKeys: getDefaultCollapsedSubMenus(props)
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { pathname, flatMenuKeysLen } = state;
        if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
            return {
                pathname: props.location.pathname,
                flatMenuKeysLen: props.flatMenuKeys.length,
                openKeys: getDefaultCollapsedSubMenus(props),
            };
        }
        return null;
    }

    isMainMenu = key => {
        const { menuData } = this.props;
        return menuData.some(item => {
            if (key)
                return item.key === key || item.path === key;
            return false;
        })
    }

    handleOpenChange = openKeys => {
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
        });
    };

    render() {
        const { fixSiderbar, theme } = this.props;
        const { openKeys } = this.state;
        const defaultProps = { openKeys }

        const siderClassName = classNames(styles.sider, {
            [styles.fixSiderBar]: fixSiderbar,
            [styles.light]: theme === 'light'
        });

        return (
            <Sider
                trigger={null}
                breakpoint="lg"
                width={192}
                theme={theme}
                collapsible={false}
                collapsed={false}
                className={siderClassName}
            >
                <div className={styles.logo} id="logo">
                    <Link to="/">
                        <h1>{title}</h1>
                    </Link>
                </div>
                <Suspense fallback={null}>
                    <BaseMenu
                        {...this.props}
                        mode="inline"
                        style={{ padding: '0px 0', width: '100%' }}
                        {...defaultProps}
                    />
                </Suspense>
            </Sider>
        )
    }
}