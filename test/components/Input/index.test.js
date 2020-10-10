import 'jsdom-global/register';
import React from 'react';
import Input from 'common/components/Input/Input.jsx';
import { mount } from 'enzyme';
import { expect, assert } from 'chai';
import { spy } from 'sinon';

const longValue = '12345678901234567890123456789012345678901234567890 ending';

describe('Input test case', () => {
    it('default max lenth is 50 (set value by jsx)', () => {
        const wrapper = mount(<Input value={longValue}/>);
        expect(wrapper.state('value')).to.be.equal(longValue.slice(0, 50));
    });
    it('default max lenth is 50 (set value by componentWillReceiveProps)', () => {
        const wrapper = mount(<Input />);
        wrapper.setProps({ value: longValue });
        expect(wrapper.state('value')).to.be.equal(longValue.slice(0, 50));
    });
    it('custom max lenth is 20', () => {
        const wrapper = mount(<Input maxLength={20} />);
        wrapper.setProps({ value: longValue });
        expect(wrapper.state('value')).to.be.equal(longValue.slice(0, 20));
    });

    describe('ref test', () => {
        it('the ref prop will not empty', () => {
            const wrapper = mount(<Input />);
            expect(wrapper.instance().ref.input).to.be.not.undefined;
        });
    });

    describe('handChange method test', () => {
        let instance;
        before(() => {
            const wrapper = mount(<Input />);
            instance = wrapper.instance();
            spy(instance, 'handleChange');
            instance.handleChange({ target: { value: 123 } });
        });
        it('handleChange has been called', () => {
            assert(instance.handleChange.calledOnce);
        });
        it('the value of the Input is what we set just now', () => {
            expect(instance.ref.input.value).to.be.equal('123');
        });
        it('the value would be cut when it beyond the maxLength', () => {
            instance.handleChange({ target: { value: longValue } });
            expect(instance.ref.input.value).to.be.equal(longValue.slice(0, 50));
        });
    });

    describe('handleClear method test', () => {
        let instance;
        before(() => {
            const wrapper = mount(<Input />);
            wrapper.setProps({ value: 123456 });
            instance = wrapper.instance();
            spy(instance, 'handleClear');
        });

        it('handleClear method has been called once', () => {
            instance.handleClear();
            assert(instance.handleClear.calledOnce);
        });

        it('the value of the Input will be cleared', () => {
            expect(instance.ref.input.value).to.be.empty;
        });
    });

    describe('clear button test', () => {
        it('clear button will be loaded by default', () => {
            const wrapper = mount(<Input />);
            const instance = wrapper.instance();
            expect(wrapper.state('allowClear')).to.be.true;
            expect(instance.ref.props.className).contains('allow-clear');
        });
        it('clear button will be controled by properity value', () => {
            const wrapper = mount(<Input allowClear={false} />);
            const instance = wrapper.instance();
            expect(wrapper.state('allowClear')).to.be.false;
            expect(instance.ref.props.className).not.contains('allow-clear');
        });

        it('clear button will hide when the value is empty', () => {
            const wrapper = mount(<Input />);
            expect(wrapper.find('i').length).to.be.equal(0);
        });

        it('clear button will show when the value is not empty', () => {
            const wrapper = mount(<Input value={123} />);
            expect(wrapper.find('i').length).to.be.equal(1);
        });
    });

    describe('disabled properity test', () => {
        it('when the disabled is Falsely, the Input can change the value', () => {
            const wrapper = mount(<Input value={123} />);
            const instance = wrapper.instance();
            instance.handleChange({ target: { value: 1234 } });
            expect(wrapper.state('value')).to.be.equal('1234');
        });
        it('when the disabled is Truly, the Input can not change the value', () => {
            const wrapper = mount(
                <Input 
                    value={123} 
                    disabled
                />
            );
            const instance = wrapper.instance();
            instance.handleChange({ target: { value: 1234 } });
            expect(wrapper.state('value')).to.be.equal('123');
        });

        it('when the disabled is Truly, the Input will contain a special className', () => {
            const wrapper = mount(
                <Input 
                    value={123} 
                    disabled
                />
            );
            expect(wrapper.find('input').props().className).contain('ant-input-disabled');
        });

        it('when the disabled is Falsely, the Input will not contain a special className', () => {
            const wrapper = mount(
                <Input 
                    value={123}
                />
            );
            expect(wrapper.find('input').props().className).not.contain('ant-input-disabled');
        });
    });

    describe('readOnly properity test', () => {
        it('when the readOnly is Falsely, the Input can change the value', () => {
            const wrapper = mount(<Input value={123} />);
            const instance = wrapper.instance();
            instance.handleChange({ target: { value: 1234 } });
            expect(wrapper.state('value')).to.be.equal('1234');
        });
        it('when the disabled is Truly, the Input can not change the value', () => {
            const wrapper = mount(
                <Input 
                    value={123} 
                    readOnly
                />
            );
            const instance = wrapper.instance();
            instance.handleChange({ target: { value: 1234 } });
            expect(wrapper.state('value')).to.be.equal('123');
        });
    });
});
