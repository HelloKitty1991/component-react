import React, { Component } from 'react';
import { AutoComplete } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const { Option } = AutoComplete;
export default class WrapAutoComplete extends Component {
    static propTypes = {
        url: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        valueProp: PropTypes.string,
        labelProp: PropTypes.string,
        value: PropTypes.any,
        maxLength: PropTypes.number
    }

    static defaultProps = {
        valueProp: 'id',
        labelProp: 'name'
    }

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            value: props.value || ''
        };
        this.onSearch = debounce(this.onSearch, 500);
        this.onChange = props.onChange ? debounce(props.onChange, 500) : null;
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: nextProps.value });
        }
    }

    onSearch = () => {
        if (this.props.url && this.searchKey) {
            window.request(this.props.url + this.searchKey).then(list => {
                const options = list.map(v => (
                    <Option key={v[this.props.valueProp]}
                        value={JSON.stringify(v)}
                    >{v[this.props.labelProp]}</Option>
                ));
                this.setState({ options });
            });
        }
    }

    handleSearch = (e) => {
        if (!e) {
            this.searchKey = null;
            return;
        }
        let value = e.target ? e.target.value : e;
        const { maxLength = 50 } = this.props;
        value = (value !== '' ? `${value}` : '').slice(0, maxLength);
        this.searchKey = value;
        this.onSearch();
    }

    onSelect = (value) => {
        if (this.onChange) {
            this.onChange(value);
        }
    }

    handleChange = (value) => {
        value = value || '';
        if (!value) {
            this.setState({ options: [] });
        }
        try {
            const temp = JSON.parse(value);
            // 非标准json的处理
            if (Object.prototype.toString.call(temp) !== '[object Object]') {
                this.setFinalValue(value);
            }
        } catch (e) {
            this.setFinalValue(value);
        }
    }

    setFinalValue(value) {
        const { maxLength = 50 } = this.props;
        const temp = (value !== '' ? `${value}` : '').slice(0, maxLength);
        this.setState({ value: temp });
        if (this.onChange) {
            this.onChange(temp);
        }
    }

    render() {
        return (
            <AutoComplete 
                {...this.props}
                value={this.state.value}
                onSearch={this.handleSearch}
                onSelect={this.onSelect}
                onChange={this.handleChange}
            >
                {this.state.options}
            </AutoComplete>
        );
    }
}
