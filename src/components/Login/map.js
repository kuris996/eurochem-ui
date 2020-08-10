import React from 'react';
import styles from './index.less';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default {
    UserName: {
        props: {
            size: 'large',
            name: 'userName',
            prefix: <UserOutlined className={styles.prefixIcon} />,
            placeholder: 'user',
            rules: [
                {
                    required: true,
                    message: 'Please enter username!',
                },
            ],
        },
    },
    Password: {
        props: {
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
            type: 'password',
            name: 'password',
            placeholder: '888888',
            rules: [
                {
                    required: true,
                    message: 'Please enter password!',
                },
            ],
        },        
    },
}