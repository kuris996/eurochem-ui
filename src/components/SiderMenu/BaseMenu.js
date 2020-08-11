import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Menu } from 'antd';
import { urlToList } from '../_utils/pathTools'
import { getMenuMatches } from './SiderMenuUtils'
import { isUrl } from '@/utils/utils'
import Link from 'umi/link';
import styles from './index.less';
import { Icon } from '@ant-design/compatible';
import IconFont from '@/components/IconFont';

const { SubMenu } = Menu;

const getIcon = icon => {
    if (typeof icon === 'string') {   
        if (isUrl(icon))
            return <Icon component={() => <img src={icon} alt="icon" className={styles.icon} />} />;
        if (icon.startsWith('icon-'))
            return <IconFont type={icon} />;
        return <Icon type={icon} alt="icon" />;
    }
    return icon;
};

export default class BaseMenu extends PureComponent {
    
    getNavMenuItems = menusData => {
        if (!menusData)
            return [];
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => this.getSubMenuOrItem(item))
            .filter(item => item);
    };

    getSelectedMenuKeys = pathname => {
        const { flatMenuKeys } = this.props;
        return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop());
    };
   
    getSubMenuOrItem = item => {
        // doc: add hideChildrenInMenu
        if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
            const { name } = item;
            return (
                <SubMenu
                    title={
                        item.icon ? (
                            <span>
                                {getIcon(item.icon)}
                                <span>{name}</span>
                            </span>
                        ) : (
                            name
                        )
                    }
                    key={item.path}
                >
                    {this.getNavMenuItems(item.children)}
                </SubMenu>
            );
        }
        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
    };

    getMenuItemPath = item => {
        const { name } = item;
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        const { location } = this.props;
        return (
            <Link
                to={itemPath}
                target={target}
                replace={itemPath === location.pathname}
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };

    conversionPath = path => {
        if (path && path.indexOf('http') === 0)
            return path;
        return `/${path || ''}`.replace(/\/+/g, '/');
    };

    getRef = ref => {
        this.wrap = ref;
    };

    render() {
        const {
            openKeys,
            isTop,
            theme,
            mode,
            location: { pathname },
            className,
            menuData
        } = this.props;

        let finalMenuData = menuData

        let selectedKeys = this.getSelectedMenuKeys(pathname);
        if (!selectedKeys.length && openKeys)
            selectedKeys = [openKeys[openKeys.length - 1]];
        
        let props = {};
        if (openKeys) {
            props = {
                openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys,
            };
            const [key] = selectedKeys;
            if (key)
                finalMenuData = (menuData || []).find((item) => item.path === key)?.children || [];
        }

        const { handleOpenChange, style } = this.props;  
        const cls = classNames(className, {
            'top-nav-menu': isTop,
        });

        return (
            <>
                <Menu
                    key="Menu"
                    mode={mode}
                    theme={theme}
                    onOpenChange={handleOpenChange}
                    selectedKeys={selectedKeys}
                    style={style}
                    className={cls}
                    {...props}
                >
                    {this.getNavMenuItems(finalMenuData)}                    
                </Menu>
                <div ref={this.getRef} />
            </>
        )
    }
}