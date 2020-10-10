import 'jsdom-global/register';
import React from 'react';
import Select from 'common/components/Select/index.jsx';
import { mount } from 'enzyme';
import { expect, assert } from 'chai';
import { spy } from 'sinon';

describe('Select test', () => {
    it('all default props test', () => {
        const wrapper = mount(<Select />);
        expect(wrapper.state('options').length).to.be.equal(0);
    });

    it('when the url is not empty and the showInitData prop is Truly, the search method will be called automaticly', () => {
        // TODO Search method will be called automaticly 
        mount(
            <Select 
                url="/sale_center/common/organization/?search="
                showInitData
            />
        );
        assert(true);
    });

    it('generateOption function test', () => {
        const wrapper = mount(
            <Select 
                options={[{ id: 1, name: 'jack' }, { id: 2, name: 'peter' }]}
                getPopupContainer={node => node}
            />
        );
        wrapper.find('div.ant-select').simulate('click');
        wrapper.update();
        const dropdown = mount(wrapper.find('Trigger').instance().getComponent());
        expect(dropdown.find('MenuItem').length).to.be.equal(2);
    });

    it('onChange function test', () => {
        const wrapper = mount(
            <Select 
                options={[{ id: 1, name: 'jack' }, { id: 2, name: 'peter' }]}
                getPopupContainer={node => node}
            />
        );
        wrapper.find('div.ant-select').simulate('click');
        wrapper.update();
        const dropdown = mount(wrapper.find('Trigger').instance().getComponent());
        dropdown.find('MenuItem').last().simulate('click');
        wrapper.update();
        expect(wrapper.find('div.ant-select-selection-selected-value').text()).to.equal('peter');
        dropdown.find('MenuItem').first().simulate('click');
        wrapper.update();
        expect(wrapper.find('div.ant-select-selection-selected-value').text()).to.equal('jack');
    });

    it('search function test', () => {
        const onSearch = spy();
        const wrapper = mount(
            <Select 
                url="/sale_center/common/organization/?search="
                onSearch={onSearch}
            />
        );
        expect(wrapper.children().props().showSearch).to.be.true;
        wrapper.find('input.ant-select-search__field').simulate('change', { target: { value: ' ' } });
        assert(onSearch.calledOnce);
    });

    it('clearOption function test', () => {
        const wrapper = mount(
            <Select 
                options={[{ id: 1, name: 'jack' }, { id: 2, name: 'peter' }]}
                getPopupContainer={node => node}
            />
        );
        const instance = wrapper.instance();
        instance.clearOptions();
        wrapper.update();
        expect(wrapper.state('options').length).to.equal(0);
        const dropdown = mount(wrapper.find('Trigger').instance().getComponent());
        expect(dropdown.find('MenuItem').length).to.equal(0);
    });
});
