import React, { PureComponent } from 'react';
import Link from 'umi/link'
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils'
import styles from './index.less'
import BaseMenu from '../SiderMenu/BaseMenu'

export default class TopNavHeader extends PureComponent {
    state = {
        maxWidth: undefined
    }

    render() {
        const { navTheme, menuData } = this.props;
        const { maxWidth } = this.state;
        const flatMenuKeys = getFlatMenuKeys(menuData);
        return (
            <div className={`${styles.head} ${styles.light}`}>
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
                            }}
                        >
                            <BaseMenu {...this.props} isTop={true} theme={navTheme} flatMenuKeys={flatMenuKeys} className={styles.menu}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}