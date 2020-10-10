import 'jsdom-global/register';
import React from 'react';
import PropTypes from 'prop-types';
import Form from 'common/components/Form/index.jsx';
import { mount } from 'enzyme';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import { doLogin } from '../../utils';

import '../../request';

class MyComponent extends React.Component {
    static propTypes = {
        onChange: PropTypes.func
    }

    onChange =(e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    render() {
        return (
            <input type="text"
                onChange={this.onChange}
            />
        );
    }
}

describe('form test', () => {
    before(done => {
        doLogin().then(() => {
            done();
        }).catch(done);
    });
    it('all default props test', () => {
        mount(<Form />);
    });

    it('incorrect props test', () => {
        const wrapper = mount(<Form />);
        expect(wrapper).not.to.be.undefined;
    });

    it('get form instance test', () => {
        const obj = {};
        mount(<Form createForm={ form => { obj.form = form; }}/>);
        expect(obj.form).not.to.be.undefined;
        expect(obj.form.getFieldsValue()).to.be.empty;
    });

    describe('form property test', () => {
        it('default properties value test', () => {
            const wrapper = mount(<Form />);
            const props = wrapper.children().props();
            [{ layout: 'horizontal' }, { columns: 1 }, { labelWidth: 150 }, { formItems: {} }, { gutter: 5 }].forEach(v => {
                for (const key in v) {
                    expect(props[key]).to.deep.equal(v[key]);
                }
            });
        });
        describe('layout property test', () => {
            it('the default value of labelAlign is right when the layout is horizontal', () => {
                const wrapper = mount(<Form />);
                expect(wrapper.children().state('labelAlign')).to.be.equal('right');
                // TODO 验证dom节点上面style样式
                // setTimeout(() => {
                //     console.log(wrapper.find('div.ant-form-item-label').getDOMNode().getAttribute('class'));
                //     done();
                // }, 1000);
            });
            it('the default value of labelAlign is left when the layout is not horizontal', () => {
                const wrapper = mount(<Form layout={'vertical'} />);
                expect(wrapper.children().state('labelAlign')).to.be.equal('left');
            });
        });

        describe('formItems property test', () => {
            it('wrong type test', () => {
                const wrapper = mount(<Form formItems={{ example: { label: '示例', type: 'x' } }}/>);
                const label = wrapper.find('div.ant-form-item-label');
                expect(label).to.have.lengthOf(0);
            });
            describe('input type test', () => {
                it('normal test', () => {
                    const obj = {};
                    const wrapper = mount(
                        <Form 
                            formItems={{ example: { label: '示例', type: 'input' } }}
                            createForm={form => { obj.form = form; }}
                        />
                    );
                    const label = wrapper.find('div.ant-form-item-label');
                    expect(label).to.have.lengthOf(1);
                    expect(label.children().props().children).to.be.equal('示例');
                    expect(wrapper.find('input')).to.have.lengthOf(1);
                    wrapper.find('input').simulate('change', { target: { value: 123 } });
                    expect(obj.form.getFieldsValue().example).to.equal('123');
                });
                it('addonAfter prototype test', () => {
                    const wrapper = mount(<Form formItems={{ example: { label: '示例', type: 'input', addonAfter: '元' } }}/>);
                    expect(wrapper.find('span.ant-input-group-addon')).to.have.lengthOf(1);
                });
            });
            describe('select type test', () => {
                it('normal test', () => {
                    const obj = {};
                    const wrapper = mount(
                        <Form 
                            formItems={{
                                example: {
                                    label: '示例', 
                                    type: 'select', 
                                    options: [{ id: 1, name: 'jack' }, { id: 2, name: 'peter' }],
                                    getPopupContainer: node => node
                                } 
                            }}
                            createForm={form => { obj.form = form; }}
                        />
                    );
                    const Select = wrapper.find('KlcSelect');
                    expect(Select).to.have.lengthOf(1);
                    expect(Select.children().props().showSearch).to.be.false;
                    Select.find('div.ant-select').simulate('click');
                    Select.update();
                    const dropdown = mount(Select.find('Trigger').instance().getComponent());
                    dropdown.find('MenuItem').at(1).simulate('click');
                    expect(obj.form.getFieldsValue().example).to.deep.equal({ key: 2, label: 'peter' });
                });
            });
            describe('search type test', () => {
                it('search test', done => {
                    const obj = {};
                    const wrapper = mount(
                        <Form 
                            formItems={{
                                example: {
                                    label: '示例', 
                                    type: 'search',
                                    url: '/sale_center/common/organization/?search='
                                }
                            }}
                            createForm={form => { obj.form = form; }}
                        />
                    );
                    const Select = wrapper.find('KlcSelect');
                    expect(Select).to.have.lengthOf(1);
                    expect(Select.children().props().showSearch).to.be.true;
                    Select.find('input.ant-select-search__field').simulate('change', { target: { value: ' ' } });
                    setTimeout(() => {
                        Select.update();
                        const dropdown = mount(Select.find('Trigger').instance().getComponent());
                        dropdown.find('MenuItem').at(0).simulate('click');
                        const values = obj.form.getFieldsValue().example;
                        expect(values).not.to.be.undefined;
                        expect(values).to.have.property('key');
                        done();
                    }, 1000);
                });
            });

            describe('checkbox type test', () => {
                it('the checkbox component will be rendered when the form mounted', () => {
                    const obj = {};
                    const wrapper = mount(
                        <Form 
                            formItems={{
                                example: {
                                    type: 'checkbox',
                                    label: '爱好',
                                    options: [{ value: 1, label: '电影' }, { value: 2, label: '旅游' }]
                                }
                            }}
                            createForm={form => { obj.form = form; }}
                        />
                    );
                    const labels = wrapper.find('CheckboxGroup').find('label');
                    expect(labels.length).to.be.equal(2);
                    expect(obj.form.getFieldsValue().example).to.be.undefined;
                    const label = labels.at(0);
                    label.find('input').simulate('change', { target: { value: 1 } });
                    wrapper.update();
                    expect(label.find('Checkbox').state('checked')).to.be.true;
                    expect(obj.form.getFieldsValue().example).to.deep.equal([1]);
                });
            });

            describe('radio type test', () => {
                it('the radio component will be rendered when the form mounted', () => {
                    const obj = {};
                    const wrapper = mount(
                        <Form
                            formItems={{
                                example: {
                                    type: 'radio',
                                    label: '性别',
                                    options: [{ value: 1, label: '男' }, { value: 2, label: '女' }]
                                }
                            }}
                            createForm={form => { obj.form = form; }}
                        />
                    );
                    const labels = wrapper.find('RadioGroup').find('label');
                    expect(labels.length).to.be.equal(2);
                    expect(obj.form.getFieldsValue().example).to.be.undefined;
                    const label = labels.at(1);
                    label.find('input').simulate('change', { target: { value: 2 } });
                    wrapper.update();
                    expect(label.find('Checkbox').state('checked')).to.be.true;
                    expect(obj.form.getFieldsValue().example).to.equal(2);
                });
            });

            describe('textarea type test', () => {
                it('the textarea component will be rendered when the form mounted', () => {
                    const obj = {};
                    const wrapper = mount(
                        <Form 
                            formItems={{
                                example: {
                                    type: 'textarea',
                                    label: '备注'
                                }
                            }}
                            createForm={form => { obj.form = form; }}
                        />
                    );
                    expect(wrapper.find('WrapTextArea')).to.have.lengthOf(1);
                    const textarea = wrapper.find('textarea');
                    textarea.simulate('change', { target: { value: 123456 } });
                    expect(obj.form.getFieldsValue().example).to.equal(123456);
                });
            });

            describe('component type test', () => {
                it('custom component will be rendered when the form mounted', () => {
                    const obj = {};
                    const wrapper = mount(
                        <Form 
                            formItems={{
                                example: {
                                    type: 'component',
                                    label: '自定义组件',
                                    component: <MyComponent />
                                }
                            }}
                            createForm={form => { obj.form = form; }}
                        />
                    );
                    expect(wrapper.find('MyComponent')).to.have.lengthOf(1);
                    wrapper.find('input').simulate('change', { target: { value: 123456 } });
                    expect(obj.form.getFieldsValue().example).to.be.equal(123456);
                });
            });
        });
    });
});
