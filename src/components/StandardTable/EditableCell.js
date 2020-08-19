import {
    Input,
    InputNumber,
    Form,
    Switch,
    Select,
} from 'antd';

const { Option } = Select;

const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    options,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            { editing ?
                inputType === 'switch' ? 
            (
                <Form.Item
                    valuePropName="checked"
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        }
                    ]}
                >
                    <Switch />
                </Form.Item>
            ) : 
            (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        }
                    ]}
                >
                    { 
                        inputType === 'number' ? (
                            <InputNumber /> 
                        ) :
                        inputType === 'select' ? (
                            <Select>
                                { options.map(item => (
                                    <Option value={item}>{item}</Option>
                                ))}
                            </Select>
                        ) :
                        <Input/>
                    }
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

export default EditableCell