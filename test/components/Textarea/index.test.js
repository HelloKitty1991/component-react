import 'jsdom-global/register';
import React from 'react';
import Textarea from 'common/components/Input/TextArea.jsx';
import { mount } from 'enzyme';
import { expect, assert } from 'chai';
import { spy } from 'sinon';

const longValue = (() => {
    let res = '';
    for (let i = 1; i <= 50; i++) {
        res += '1234567890';
    }
    return `${res}ending`;
})();

describe('Textarea test case', () => {
    it('default max lenth is 500 (set value by jsx)', () => {
        const wrapper = mount(<Textarea value={longValue} />);
        wrapper.setProps({ value: longValue });
        expect(wrapper.state('value')).to.be.equal(longValue.slice(0, 500));
    });
    it('default max lenth is 500 (set value by componentWillReceiveProps)', () => {
        const wrapper = mount(<Textarea />);
        wrapper.setProps({ value: longValue });
        expect(wrapper.state('value')).to.be.equal(longValue.slice(0, 500));
    });
    it('custom max lenth is 20', () => {
        const wrapper = mount(<Textarea maxLength={20} />);
        wrapper.setProps({ value: longValue });
        expect(wrapper.state('value')).to.be.equal(longValue.slice(0, 20));
    });

    describe('ref test', () => {
        it('ref is not null', () => {
            const wrapper = mount(<Textarea />);
            expect(wrapper.instance().ref).to.be.not.undefined;
        });
    });

    describe('handChange method test', () => {
        let instance;
        let wrapper;
        before(() => {
            wrapper = mount(<Textarea />);
            instance = wrapper.instance();
            spy(instance, 'handleChange');
            instance.handleChange({ target: { value: 123 } });
        });
        it('handleChange has been called', () => {
            assert(instance.handleChange.calledOnce);
        });
        it('the value of the Textarea is what we set just now', () => {
            expect(wrapper.state('value')).to.be.equal('123');
        });
        it('the value would be cut when it beyond the maxLength', () => {
            instance.handleChange({ target: { value: longValue } });
            expect(wrapper.state('value')).to.be.equal(longValue.slice(0, 500));
        });
    });

    describe('handleClear method test', () => {
        let instance;
        let wrapper;
        before(() => {
            wrapper = mount(<Textarea />);
            wrapper.setProps({ value: 123456 });
            instance = wrapper.instance();
            spy(instance, 'handleClear');
        });

        it('handleClear method has been called once', () => {
            instance.handleClear();
            assert(instance.handleClear.calledOnce);
        });

        it('the value of the Textarea will be cleared', () => {
            expect(wrapper.state('value')).to.be.empty;
        });
    });

    describe('clear button test', () => {
        it('clear button will be loaded by default', () => {
            const wrapper = mount(<Textarea />);
            expect(wrapper.prop('allowClear')).to.be.true;
            expect(wrapper.find('textarea').props().className).contains('allow-clear');
        });
        it('clear button will be controled by properity value', () => {
            const wrapper = mount(<Textarea allowClear={false} />);
            expect(wrapper.prop('allowClear')).to.be.false;
            expect(wrapper.find('textarea').props().className).not.contains('allow-clear');
        });

        it('clear button will hide when the value is empty', () => {
            const wrapper = mount(<Textarea />);
            expect(wrapper.find('i').length).to.be.equal(0);
        });

        it('clear button will show when the value is not empty', () => {
            const wrapper = mount(<Textarea value={123} />);
            expect(wrapper.find('i').length).to.be.equal(1);
        });
    });

    describe('disabled properity test', () => {
        it('when the disabled is Falsely, the Textarea can change the value', () => {
            const wrapper = mount(<Textarea value={123} />);
            const instance = wrapper.instance();
            instance.handleChange({ target: { value: 1234 } });
            expect(wrapper.state('value')).to.be.equal('1234');
        });
        it('when the disabled is Truly, the Textarea can not change the value', () => {
            const wrapper = mount(
                <Textarea 
                    value={123} 
                    disabled
                />
            );
            const instance = wrapper.instance();
            instance.handleChange({ target: { value: 1234 } });
            expect(wrapper.state('value')).to.be.equal('123');
        });

        it('when the disabled is Truly, the Textarea will contain a special className', () => {
            const wrapper = mount(
                <Textarea 
                    value={123} 
                    disabled
                />
            );
            expect(wrapper.find('textarea').props().className).contain('ant-input-disabled');
        });

        it('when the disabled is Falsely, the Textarea will not contain a special className', () => {
            const wrapper = mount(
                <Textarea 
                    value={123}
                />
            );
            expect(wrapper.find('textarea').props().className).not.contain('ant-input-disabled');
        });
    });

    describe('readOnly properity test', () => {
        it('when the readOnly is Falsely, the Textarea can change the value', () => {
            const wrapper = mount(<Textarea value={123} />);
            const instance = wrapper.instance();
            instance.handleChange({ target: { value: 1234 } });
            expect(wrapper.state('value')).to.be.equal('1234');
        });
        it('when the disabled is Truly, the Textarea can not change the value', () => {
            const wrapper = mount(
                <Textarea 
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
