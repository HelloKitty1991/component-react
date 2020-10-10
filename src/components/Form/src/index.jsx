import {
    email, mobilePhone, moneyWithSixDecimal, moneyWithTwoDecimal, positiveIntegerNumber, positiveNumber, url 
} from '@hello/regexp';
import {
    Checkbox, Col, DatePicker, Form, InputNumber, Radio, Row 
} from 'antd';
import { difference } from '@hello/utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Input from '../../Input';
import Select from '../../Select';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { WeekPicker, MonthPicker } = DatePicker;
const { TextArea } = Input;

export default @Form.create() class helloForm extends Component {
    static propTypes = {
        layout: PropTypes.string,
        createForm: PropTypes.func,
        form: PropTypes.object,
        labelAlign: PropTypes.string,
        labelWidth: PropTypes.number,
        formItems: PropTypes.object,
        columns: PropTypes.number,
        gutter: PropTypes.number,
        lineHeight: PropTypes.number,
        getFormGroup: PropTypes.func,
        children: PropTypes.Object,
        labelInset: PropTypes.bool
    }

    static defaultProps = {
        layout: 'horizontal',
        columns: 1,
        createForm: () => {},
        labelWidth: 150,
        formItems: {},
        gutter: 5,
        lineHeight: 0,
        labelInset: false
    }

    constructor(props) {
        super(props);
        this.state = {
            labelAlign: this.props.layout === 'horizontal' ? 'right' : 'left',
            groups: []
        };
    }

    componentDidMount() {
        if (this.props.createForm) {
            this.props.createForm(this.props.form);
        }
        if (this.props.labelInset) {
            this.setInputPadding(this.props.formItems);
        }
    }

    componentWillReceiveProps(nextProps) { // eslint-disable-line
        if (this.props.labelInset) {
            const res = difference(nextProps.formItems, this.props.formItems);
            if (Object.keys(res).length) {
                setTimeout(() => {
                    this.setInputPadding(nextProps.formItems);
                }, 0);
            }
        }
    }

    setInputPadding(formItems) {
        Object.keys(formItems).forEach(fieldName => {
            const formItem = formItems[fieldName];
            if (
                (typeof formItem.display !== 'undefined' && !formItem.display) 
                || (typeof formItem.visible !== 'undefined' && !formItem.visible)
                || ['checkbox', 'radio'].includes(formItem.type)) {
                return;
            }
            if (formItem.children) {
                this.setInputPadding(formItem.children);
            } else if (!['group'].includes(formItem.type) && !formItem.labelOutset) {
                const span = document.createElement('span');
                span.style.fontSize = '14px';
                span.innerHTML = formItem.label;
                document.body.appendChild(span);
                const node = document.getElementById(fieldName);
                if (node) {
                    let { type } = formItem;
                    if (type === 'component') {
                        if (node.className.indexOf('ant-select') >= 0) {
                            type = 'select';
                        } else if (node.className.indexOf('ant-input') >= 0) {
                            type = 'input';
                        } else {
                            document.body.removeChild(span);
                            return;
                        }
                    }
                    const required = (formItem.rules || []).find(rule => rule.required);
                    let base = 15;
                    if (required) {
                        base += 10;
                    }
                    if (['select', 'search'].includes(type)) {
                        const target = node.querySelector('.ant-select-selection');
                        if (target) {
                            target.style.paddingLeft = `${span.offsetWidth + base}px`;
                        }
                    } else if (['input', 'number', 'textarea'].includes(type)) {
                        node.style.paddingLeft = `${span.offsetWidth + base + 10}px`;
                    } else if (['date'].includes(type)) {
                        const target = node.querySelector('input');
                        if (target) {
                            target.style.paddingLeft = `${span.offsetWidth + base + 10}px`;
                        }
                    }
                }
                document.body.removeChild(span);
            }
        });
    }

    generateValidator = validator => {
        return (rule, value, cb) => {
            const { res, message } = validator(value);
            if (value && !res) {
                cb(rule.message || message);
            } else {
                cb();
            }
        };
    };

    getRules = fieldObj => {
        const rules = [];
        let required = false;
        (fieldObj.rules || []).forEach(rule => {
            if (rule.required) {
                required = true;
                rule.message = rule.message || `请输入${fieldObj.label}`;
            }
            if (rule.max) {
                rule.message = rule.message
                    || `${fieldObj.label}最多只能输入${rule.max}个字符`;
            }
            if (rule.min) {
                rule.message = rule.message
                    || `${fieldObj.label}至少需要输入${rule.min}个字符`;
            }
            switch (rule.type) {
                case 'positiveIntegerNumber':
                    rule.validator = rule.validator
                        || this.generateValidator(positiveIntegerNumber);
                    break;
                case 'positiveNumber':
                    rule.validator = rule.validator
                        || this.generateValidator(positiveNumber);
                    break;
                case 'email':
                    rule.validator = rule.validator || this.generateValidator(email);
                    break;
                case 'mobilePhone':
                    rule.validator = rule.validator || this.generateValidator(mobilePhone);
                    break;
                case 'url':
                    rule.validator = rule.validator || this.generateValidator(url);
                    break;
                case 'moneyWithSixDecimal':
                    rule.validator = rule.validator
                        || this.generateValidator(moneyWithSixDecimal);
                    break;
                case 'moneyWithTwoDecimal':
                    rule.validator = rule.validator
                        || this.generateValidator(moneyWithTwoDecimal, rule);
                    break;
                default:
                    break;
            }
            rules.push(rule);
        });
        return { required, rules };
    };

    generateFormItem = (field, fieldObj) => {
        const {
            columns = 1,
            layout,
            lineHeight,
            labelInset
        } = this.props;
        const { getFieldDecorator } = this.props.form;
        let component;
        switch (fieldObj.type) {
            case 'input': {
                component = (
                    <Input
                        {...fieldObj}
                        placeholder={
                            fieldObj.placeholder
                            || `请输入${fieldObj.label}`
                        }
                    />
                );
                break;
            }
            case 'number': {
                component = (
                    <InputNumber
                        {...fieldObj}
                        placeholder={
                            fieldObj.placeholder
                            || `请输入${fieldObj.label}`
                        }
                    />
                );
                break;
            }
            case 'select': {
                component = (
                    <Select
                        {...fieldObj}
                        placeholder={
                            fieldObj.placeholder
                            || `请选择${fieldObj.label}`
                        }
                    />
                );
                break;
            }
            case 'search': {
                component = (
                    <Select
                        {...fieldObj}
                        placeholder={
                            fieldObj.placeholder || '输入关键字进行搜索'
                        }
                    />
                );
                break;
            }
            case 'checkbox': {
                component = <CheckboxGroup {...fieldObj} />;
                break;
            }
            case 'radio': {
                component = <RadioGroup {...fieldObj} />;
                break;
            }
            case 'textarea': {
                component = (
                    <TextArea {...fieldObj}
                        placeholder={fieldObj.placeholder || `请输入${fieldObj.label}`}
                        autosize={!fieldObj.rows}
                    />
                );
                break;
            }
            case 'text': {
                component = <label>{fieldObj.value}</label>;
                break;
            }
            case 'date': 
            case 'datetime': {
                const isDateTime = fieldObj.type === 'datetime';
                component = (
                    <DatePicker 
                        {...fieldObj}
                        style={({ width: '100%', ...fieldObj.style || {} })}
                        showTime={isDateTime}
                        format={fieldObj.format || (isDateTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD')}
                        placeholder={fieldObj.placeholder || `请选择${fieldObj.label}`}
                    />
                );
                break;
            }
            case 'month': {
                component = (
                    <MonthPicker 
                        {...fieldObj}
                        style={({ width: '100%', ...fieldObj.style || {} })}
                        format={fieldObj.format || 'YYYY-MM'}
                        placeholder={fieldObj.placeholder || `请选择${fieldObj.label}`}
                    />
                );
                break;
            }
            case 'week': {
                component = (
                    <WeekPicker
                        {...fieldObj}
                        style={({ width: '100%', ...fieldObj.style || {} })}
                        format={fieldObj.format || 'YYYY-wo'}
                        placeholder={fieldObj.placeholder || `请选择${fieldObj.label}`}
                    />
                );
                break;
            }
            case 'component': {
                const { props } = fieldObj.component;
                component = React.cloneElement(fieldObj.component, { ...props, placeholder: props.placeholder || fieldObj.label });
                break;
            }
            default: {
                break;
            }
        }
        if (fieldObj.visible === false) {
            getFieldDecorator(field, {
                ...fieldObj
            });
            return null;
        } 
        if (!fieldObj.label) {
            const { rules } = this.getRules(fieldObj);
            const colStyle = Object.assign({}, lineHeight ? { height: lineHeight } : {}, fieldObj.colStyle || {});
            return (
                <Col span={fieldObj.span || Math.floor(24 / columns)}
                    key={field}
                    style={colStyle}
                    className={'klc-col'}
                >
                    <FormItem>
                        {
                            getFieldDecorator(field, {
                                ...fieldObj,
                                rules
                            })(component)
                        }
                        <div className={['ant-form-explain', 'tip'].join(' ')}>{fieldObj.tip}</div>
                        {fieldObj.extra}
                    </FormItem>
                </Col>
            );
        }
        if (component && (typeof fieldObj.display === 'undefined' || fieldObj.display)) {
            const { required, rules } = this.getRules(fieldObj);
            const labelAlign = this.props.labelAlign || this.state.labelAlign || 'right';
            const colStyle = Object.assign({}, lineHeight ? { height: lineHeight } : {}, fieldObj.colStyle || {});
            return (
                <Col span={fieldObj.span || Math.floor(24 / columns)}
                    key={field}
                    style={colStyle}
                    className={'klc-col'}
                >
                    <FormItem
                        style={
                            layout === 'horizontal' ? { display: 'flex' } : {}
                        }
                        className={[
                            labelAlign === 'right' ? 'label-align-right' : '', 
                            required ? 'required' : 'not_required', 
                            labelInset && !['radio', 'checkbox'].includes(fieldObj.type) && !fieldObj.labelOutset ? 'label-inset' : ''
                        ].join(' ')}
                        label={
                            <span 
                                style={{ width: this.props.labelInset && !fieldObj.labelOutset ? 'auto' : `${this.props.labelWidth}px`, float: 'left' }}
                                className={fieldObj.colon === false ? '' : "klc-form-item-span"}
                            >{fieldObj.label}
                            </span>
                        }
                    >
                        {getFieldDecorator(field, {
                            ...fieldObj,
                            rules
                        })(component)}
                        <div className={['ant-form-explain', 'tip'].join(' ')}>{fieldObj.tip}</div>
                        {fieldObj.extra}
                    </FormItem>
                </Col>
            );
        }
    }

    generateGroup = (formItems) => {
        const groups = [];
        const cols = [];
        let result;
        Object.keys(formItems).forEach(field => {
            const fieldObj = formItems[field];
            if (fieldObj.type === 'group') {
                if (typeof fieldObj.display === 'undefined' || fieldObj.display) {
                    cols.push(React.cloneElement(fieldObj.container, {}, this.generateGroup(fieldObj.children)));
                    result = cols;
                }
            } else {
                const item = this.generateFormItem(field, fieldObj);
                if (item) {
                    cols.push(item);
                }
                result = <Row gutter={this.props.gutter}>{cols}</Row>;
            }
        });
        groups.push(result);
        return groups;
    }

    render() {
        const formItems = this.generateGroup(this.props.formItems);
        return (
            <div className={'klc-form'}><Form><Row>{formItems}</Row></Form></div>
        );
    }
}
