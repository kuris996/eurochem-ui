import React, { PureComponent } from 'react';
import Link from 'umi/link'
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils'
import styles from './index.less'
import BaseMenu from '../SiderMenu/BaseMenu'
import RightContent from '../RightContent';

export default class TopNavHeader extends PureComponent {
    state = {
        maxWidth: undefined
    }

    static getDerivedStateFromProps(props) {
        return {
          maxWidth:
            window.innerWidth -
            40,
        };
      }

    render() {
        const { theme, menuData } = this.props;
        const { maxWidth } = this.state;
        const flatMenuKeys = getFlatMenuKeys(menuData);
        const noChildrenMenuData = (menuData || []).map((item) => ({
            ...item,
            children: undefined,
        }));
        return (
            <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
                <div
                    ref={ref => {
                        this.maim = ref;
                    }}
                    className={`${styles.main}`}
                >
                    <div className={styles.left}>
                        <div
                            style={{
                                maxWidth,
                                width: '100%'
                            }}
                        >
                            <BaseMenu 
                                {...this.props} 
                                menuData={noChildrenMenuData}
                                handleOpenChange={() => {}}
                                flatMenuKeys={flatMenuKeys} 
                                className={styles.menu}
                                style={{ width: 'calc(100%) - 192px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}