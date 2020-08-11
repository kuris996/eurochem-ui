import React, { Fragment } from 'react';
import { Layout } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';
import { Icon } from '@ant-design/compatible';

const { Footer } = Layout;
const FooterView = () => (
    <Footer style={{ padding: 0 }}>
        <GlobalFooter copyright={
                <Fragment>
                    Copyright <Icon type="copyright" /> Accenture 2020 
                </Fragment>
            }
        >
        </GlobalFooter>
    </Footer>
);
export default FooterView;