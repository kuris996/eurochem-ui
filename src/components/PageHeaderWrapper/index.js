import React from 'react'
import Link from 'umi/link'
import { PageHeader, Typography } from 'antd'
import classNames from 'classnames'
import GridContent from '@/components/GridContent'
import MenuContext from '@/layouts/MenuContext';
import { conversionBreadcrumbList } from './breadcrumb'
import styles from './index.less'

const { Title } = Typography;

const PageHeaderWrapper = ({
    children,
    wrapperClassName,
    home,
    top,
    title,
    content,
    logo,
    extraContent,
    hiddenBreadcrumb,
    ...restProps
}) => {
    return (
        <div style={{ margin: '-24px -24px 0'}} className={classNames(wrapperClassName, styles.main)}>
           {top}
           <MenuContext.Consumer>
               { value => {
                   return (
                       <div className={styles.wrapper}>
                            <div
                                className={classNames({
                                    [styles.wide]: false
                                })}
                            >
                                <PageHeader
                                    title={
                                        <>
                                            {logo && <span className={styles.logo}>{logo}</span>}
                                            <Title
                                                level={4}
                                                style={{
                                                    marginBottom: 0,
                                                    display: 'inline-block',
                                                }}
                                            >
                                                {title}
                                            </Title>
                                        </>
                                    }
                                    key="pageheader"
                                    {...restProps}
                                    breadcrumb={
                                        conversionBreadcrumbList({
                                            ...value,
                                            ...restProps,
                                            ...(home !== null && {
                                                home: "Home",
                                            }),
                                        })
                                    }
                                    className={styles.pageHeader}
                                    linkElement={Link}
                                >
                                    <div className={styles.detail}>
                                        <div className={styles.main}>
                                            <div className={styles.row}>
                                                {content && <div className={styles.content}>{content}</div>}
                                                {extraContent && <div className={styles.extraContent}>{extraContent}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </PageHeader>
                            </div>
                       </div>
                   )
               }}
           </MenuContext.Consumer>
           { children ? (
               <div className={styles['children-content']}>
                   <GridContent>{children}</GridContent>
                </div>
           ) : null}
        </div>
    )
}

export default PageHeaderWrapper