import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva'
import moment from 'moment';
import Link from 'umi/link';
import StandardTable from '@/components/StandardTable'
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import { PlusOutlined, SaveOutlined, ExportOutlined, ImportOutlined, InboxOutlined } from '@ant-design/icons';
import {
    Card,
    Form,
    Row,
    Col,
    Input,
    Select,
    DatePicker,
    InputNumber,
    Button,
    Upload
} from 'antd';

import styles from './TableList.less';

const { Dragger } = Upload;

const { Option } = Select;

class Routes extends PureComponent {
    state = {
        selectedRows: [],
    }

    columns = [
        {
            title: 'Route Name',
            dataIndex: 'routeName',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Cost Name',
            dataIndex: 'costName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Currency',
            dataIndex: 'currency',
        },
        {
            title: 'Date',
            dataIndex: 'date',
        }
    ]

    renderForm() {
        return (
            <Form>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <Form.Item label="Macro Region:">
                            <Input></Input>
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="Sub Region:">
                            <Input></Input>
                        </Form.Item>
                    </Col>                    
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <Form.Item label="From:">
                            <Input.Group compact>
                                <Select style={{ width: 100 }} placeholder="Type">
                                </Select>
                                <Select style={{ width: 'calc(100% - 100px)' }} placeholder="Location">
                                </Select>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="To:">
                            <Input.Group compact>
                                <Select style={{ width: 100 }} placeholder="Type">
                                </Select>
                                <Select style={{ width: 'calc(100% - 100px)' }} placeholder="Location">
                                </Select>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col md={8} sm={24}>
                        <Form.Item label="Route Costs by Date:">
                            <DatePicker />
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ marginBottom: 24 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button style={{ marginLeft: 8 }}>
                            Reset
                        </Button>
                    </div>
                </div>
            </Form>
        )
    }

    render() {
        const { selectedRows } = this.state;

        return (
            <PageHeaderWrapper title="Routes">
                <Card  bordered={false}>
                    <div>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Button>Remove</Button>
                                </span>
                            )}
                            <div style={{ textAlign: 'right', marginRight: '-8px' }}>
                                <Button type="primary"><PlusOutlined/> Add</Button>
                                <Button type="primary"><SaveOutlined/> Save</Button>
                                <Button type="primary"><ExportOutlined/> Export</Button>
                                <Button type="primary"><ImportOutlined/> Import</Button>
                            </div>
                        </div>
                        <StandardTable
                            selectedRows={selectedRows}
                            columns={this.columns}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        )
    }
}

export default Routes;