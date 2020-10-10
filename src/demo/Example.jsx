import { Col, Radio, Row } from 'antd';
import React from 'react';
import BaseComponent from 'src/BaseComponent';
import AddressMap from 'src/components/AddressMap';
import AutoComplete from 'src/components/AutoComplete';
import Button from 'src/components/Button';
import Cascader from 'src/components/Cascader';
import ExportButton from 'src/components/ExportButton';
import Form from 'src/components/Form';
import Input from 'src/components/Input';
import Textarea from 'src/components/Input/TextArea';
import RecordInformationFooter from 'src/components/RecordInformationFooter';
import Region from 'src/components/Region';
import TextGroup from 'src/components/TextGroup';

import orderData from '../../data/orderData';
import '../../utils/request';
import './example.less';


const RadioGroup = Radio.Group;

class CustomFormField extends React.Component {
    constructor(props) {
        super(props);
        const value = props.value || {};
        this.state = {
            value: { key: value ? value.key || 'RATIO' : 'RATI0', value: value.value }
        };
    }

    onChange = e => {
        this.setState({
            value: { key: e.target.value, value: '' }
        });
        this.props.onChange && this.props.onChange({ key: e.target.value, value: '' });
    };

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const { value } = nextProps;
            if (value) {
                this.setState({ value: { key: value ? value.key || 'RATIO' : 'RATI0', value: value.value } });
            }
        }
    }

    inputChange(value, type) {
        this.setState({
            value: { key: type, value }
        });
        this.props.onChange && this.props.onChange({ key: type, value });
    }

    render() {
        const { value } = this.state;
        return (
            <div>
                <div className="row"
                    style={{ alignItems: 'flex-start' }}
                >
                    <RecordInformationFooter/>
                    <RadioGroup
                        style={{ display: 'flex', alignItems: 'center' }}
                        onChange={this.onChange}
                        value={value.key}
                    >
                        <Radio
                            style={{ lineHeight: '42px' }}
                            value="RATIO"
                        >固定承担比例</Radio>

                        <Radio
                            style={{ lineHeight: '42px' }}
                            value="AMOUNT"
                        >固定承担金额</Radio>
                        {value.key === 'AMOUNT' ? (
                            <Input
                                addonAfter="元/单"
                                value={value.value}
                                placeholder="请输入正整数"
                                onChange={e => this.inputChange(e.target.value, 'AMOUNT')}
                            />
                        ) : (
                            <Input
                                value={value.value}
                                placeholder="请输入小数，如0.5"
                                onChange={e => this.inputChange(e.target.value, 'RATIO')}
                            />
                        )}
                    </RadioGroup>
                </div>
            </div>
        );
    }
}

class Example extends BaseComponent {
    constructor() {
        super();
        this.state = {
            textGroupData: orderData,
            formItems: {
                name: {
                    label: '姓名',
                    type: 'input',
                    rules: [
                        {
                            required: true
                        }
                    ],
                    tip: '这是姓名提示',
                    extra: <span className="form-item-addon-after">extra</span>
                },
                org_id: {
                    label: '组织',
                    type: 'search',
                    url:
                        '/sale_center/common/organization/?search=',
                    rules: [
                        {
                            required: true
                        }
                    ]
                },
                type: {
                    label: '项目',
                    type: 'select',
                    rules: [
                        {
                            required: true
                        }
                    ],
                    getPopupContainer: node => !console.log(node, 333333333333333) && node.parentElement
                },
                amount: {
                    label: '金额(不带小数)',
                    type: 'input',
                    addonAfter: '元',
                    disabled: true,
                    rules: [
                        {
                            required: true
                        },
                        {
                            type: 'positiveIntegerNumber'
                        }
                    ]
                },
                amount1: {
                    label: '金额(带小数)',
                    type: 'input',
                    addonAfter: '元',
                    rules: [
                        {
                            required: true
                        },
                        {
                            type: 'positiveNumber'
                        }
                    ]
                },
                amount2: {
                    label: '金额(带两位小数)',
                    type: 'input',
                    addonAfter: '元',
                    rules: [
                        {
                            required: true
                        },
                        {
                            type: 'moneyWithTwoDecimal'
                        }
                    ]
                },
                amount3: {
                    label: '金额(带六位小数)',
                    type: 'input',
                    addonAfter: '万元abcdef',
                    rules: [
                        {
                            required: true
                        },
                        {
                            type: 'moneyWithSixDecimal'
                        }
                    ]
                },
                hobbies: {
                    label: '爱好',
                    type: 'checkbox',
                    options: [
                        {
                            label: '电影',
                            value: 1
                        },
                        {
                            label: '旅游',
                            value: 2
                        }
                    ]
                },
                sex: {
                    label: '性别',
                    type: 'radio',
                    options: [
                        {
                            label: '男',
                            value: 1
                        },
                        {
                            label: '女',
                            value: 2
                        }
                    ],
                    onChange: e => {
                        const { formItems } = this.state;
                        formItems.hobbies.disabled = e.target.value === 1;
                        this.setState({ formItems });
                        this.form.setFieldsValue({ hobbies: [e.target.value] });
                    }
                },
                remark: {
                    label: '备注',
                    type: 'textarea',
                    rows: 3
                },
                diy: {
                    label: '自定义组件',
                    type: 'component',
                    component: <CustomFormField />,
                    rules: [
                        {
                            required: true
                        }
                    ],
                    span: 16
                },
                autoComplete: {
                    label: '自动匹配输入',
                    type: 'component',
                    component: (
                        <AutoComplete
                            allowClear
                            url="/sale_center/common/boom_org/?org_name="
                            valueProp="boom_id"
                            maxLength={10}
                            onChange={value => { console.log(value); }}
                        />
                    )
                },
                region: {
                    label: '省市区选择',
                    type: 'component',
                    component: (
                        <Region />
                    )
                },
                vehicle: {
                    label: '车型/车系选择',
                    type: 'component',
                    component: (
                        <Cascader
                            key={Math.random() + ''.substr(2)}
                            options={[
                                {
                                    label: '品牌/主机厂',
                                    url:
                                    '/vehicletype_manage/vehicleserial/?brand_electromobile=False&protocol=103366&brand_type=AUTO&manufacturer_serial=',
                                    labelProps: 'manufacturer_serial'
                                },
                                {
                                    label: '车型',
                                    url: '/common/vehicletype/?serial={key}&search=',
                                    labelProps: 'model'
                                }
                            ]}
                            onChange={(value, allValue, index) => console.log(value, allValue, index)
                            }
                            style={{ margin: '5px 0' }}
                        />
                    )
                },
                birthday: {
                    label: '出生日期',
                    type: 'date'
                },
                entryTime: {
                    label: '入职时间',
                    type: 'datetime'
                },
                month: {
                    label: '月份',
                    type: 'month'
                },
                week: {
                    label: '周数',
                    type: 'week'
                }
            }
        };
    }

    componentDidMount() {
        window.request('/sale_center/activity/201911upload/enums/').then(data => {
            const { formItems } = this.state;
            formItems.type.options = (data.upload_type || []).map(v => ({ id: v[0], name: v[1] }));
            this.setState({
                formItems
            });
        });
        this.form.setFieldsValue({
            type: { key: '3' },
            vehicle: [
                { key: 5, label: '宝马(进口)/MINI/MINI' },
                { key: 41845, label: '2013款 1.6T COOPER S ALL4' }
            ] 
        });
    }

    validateForm = () => {
        this.form.validateFields((err, values) => {
            console.log(values);
        });
    }

    render() {
        return (
            <div style={{ width: '95%', margin: '0 auto' }}>
                <fieldset>
                    <legend>确认框</legend>
                    <Button onClick={() => this.showConfirm('这是一个确认框', () => { console.log('onOK'); }, () => { console.log('onCancel'); })}>
                        不带标题的询问确认框
                    </Button>
                    <Button
                        onClick={() => this.showConfirm({
                            title: '这个是标题',
                            content: '这个是正文'
                        })
                        }
                    >
                        带标题的询问确认框
                    </Button>
                    <Button
                        onClick={() => this.showConfirm({
                            content: '这是一个确认框',
                            type: 'warning'
                        })
                        }
                    >
                        不带标题的警告确认框
                    </Button>
                    <Button
                        onClick={() => this.showConfirm({
                            title: '这个是标题',
                            content: '这个是正文',
                            type: 'warning'
                        })
                        }
                    >
                        带标题的警告确认框
                    </Button>
                </fieldset>
                <fieldset>
                    <legend>提示信息框</legend>
                    <Button onClick={() => this.showErrorAlert('这里是正文', () => { console.log('alert callback'); })}>
                        不带标题的错误信息
                    </Button>
                    <Button
                        onClick={() => this.showErrorAlert('这里是正文 ', '这里是标题')
                        }
                    >
                        带标题的错误信息
                    </Button>
                    <Button onClick={() => this.showInfoAlert('这里是正文')}>
                        不带标题的提示信息
                    </Button>
                    <Button
                        onClick={() => this.showInfoAlert('这里是正文 ', '这里是标题')
                        }
                    >
                        带标题的提示信息
                    </Button>
                    <Button onClick={() => this.showWarningAlert('这里是正文')}>
                        不带标题的警告信息
                    </Button>
                    <Button
                        onClick={() => this.showWarningAlert('这里是正文 ', '这里是标题')
                        }
                    >
                        带标题的警告信息
                    </Button>
                    <Button onClick={() => this.showSuccessAlert('这里是正文')}>
                        不带标题的成功信息
                    </Button>
                    <Button
                        onClick={() => this.showSuccessAlert('这里是正文 ', '这里是标题')
                        }
                    >
                        带标题的成功信息
                    </Button>
                </fieldset>
                <fieldset>
                    <legend>Toast信息框</legend>
                    <Button
                        onClick={() => this.showSuccessToast({
                            title: '支付成功',
                            msg: '{countDown}秒后关闭',
                            countDown: 5
                        })
                        }
                    >
                        带标题的成功Toast信息
                    </Button>
                    <Button
                        onClick={() => this.showErrorToast({
                            title: '支付成功',
                            msg: '{countDown}秒后关闭',
                            countDown: 5
                        })
                        }
                    >
                        带标题的错误Toast信息
                    </Button>
                    <Button
                        onClick={() => this.showInfoToast({
                            title: '支付成功',
                            msg: '{countDown}秒后关闭',
                            countDown: 5
                        })
                        }
                    >
                        带标题的提示Toast信息
                    </Button>
                    <Button
                        onClick={() => this.showWarningToast({
                            title: '支付成功',
                            msg: '这个是正文'
                        })
                        }
                    >
                        带标题的警告Toast信息
                    </Button>
                </fieldset>
                <fieldset>
                    <legend>其他功能</legend>
                    <Row>
                        <Col span={2}>
                            <Button
                                onClick={() => this.showPhotoView('http://file.hello.com/api/file/9284b70d0fa6d6fe46ee1b90329f2c3a/')
                                }
                            >
                                图片预览
                            </Button>
                        </Col>
                        <Col span={2}>
                            <ExportButton
                                url={'/sale_center/activity/201911upload/export/'}
                                title={'测试导出'}
                            />
                        </Col>
                        <Col span={2}>
                            <Button
                                onClick={() => this.showComponent(
                                    <AddressMap
                                        callback={value => console.log(value)}
                                        pointX={30.551764}
                                        pointY={103.539516}
                                    />,
                                    { 
                                        title: '地址选择', 
                                        showFooter: true
                                    }
                                )
                                }
                            >
                                打开地图
                            </Button>
                        </Col>
                    </Row>
                </fieldset>
                <fieldset>
                    <legend>TextGroup展示</legend>
                    <TextGroup data={this.state.textGroupData}
                        column={6}
                    />
                </fieldset>
                <fieldset>
                    <legend>零散组件测试</legend>
                    <Textarea />
                </fieldset>
                <fieldset>
                    <legend>Form表单测试</legend>
                    <Form
                        // columns={3}
                        // labelWidth={150}
                        formItems={this.state.formItems}
                        createForm={form => { this.form = form; }}
                    ></Form>
                    <Button onClick={this.validateForm}>提交表单</Button>
                </fieldset>
            </div>
        );
    }
}

export default Example;

export { Example };
