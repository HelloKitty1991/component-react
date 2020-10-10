import React, { PureComponent } from 'react';
import { Input, Icon } from 'antd';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

const { TextArea } = Input;


class WrapTextArea extends PureComponent {
    static defaultProps = {
        allowClear: true,
        disabled: false,
        readOnly: false,
        maxLength: 500,
        className: '',
        debounce: false,
        debounceDelay: 500
    }

    static propTypes = {
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        allowClear: PropTypes.bool,
        value: PropTypes.any,
        onChange: PropTypes.func,
        style: PropTypes.object,
        maxLength: PropTypes.number,
        className: PropTypes.string,
        debounce: PropTypes.bool,
        debounceDelay: PropTypes.number
    }

    state = {
        value: typeof this.props.value !== 'undefined' ? `${this.props.value}`.slice(0, this.props.maxLength) : '',
        textAreaProps: (() => {
            const textAreaProps = {};
            const excludeProps = ['rules', 'tip', 'extra', 'allowClear', 'debounce', 'debounceDelay'];
            Object.keys(this.props).forEach(key => {
                if (!excludeProps.includes(key)) {
                    textAreaProps[key] = this.props[key];
                }
            });
            return textAreaProps;
        })()
    }

    constructor(props) {
        super(props);
        this.onChange = props.debounce && props.onChange ? debounce(props.onChange, props.debounceDelay) : props.onChange;
    }

    handleClear = () => {
        this.setState({ value: '' });
        if (this.props.onChange) {
            this.props.onChange({ target: { value: '' } });
        }
    }

    handleChange = e => {
        const { disabled, readOnly } = this.props;
        if (disabled || readOnly) {
            return;
        }
        let value = e.target ? e.target.value : e;
        value = typeof value !== 'undefined' ? `${value}` : '';
        value = value.slice(0, this.props.maxLength);
        if (value === this.state.value) {
            return; 
        }
        this.setState({ value });
        if (this.onChange && e) {
            e.persist();
            this.onChange(e);
        }
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: typeof nextProps.value !== 'undefined' ? `${nextProps.value}`.slice(0, this.props.maxLength) : '' });
        }
    }

    render() {
        const {
            disabled, allowClear, style = {}, readOnly, className
        } = this.props;
        const { value } = this.state;
        return (
            <div className="klc-textarea" >
                <TextArea
                    title={value}
                    { ...this.props }
                    value={value}
                    style={({ width: '100%', ...style })}
                    onChange={this.handleChange}
                    className={this.props.allowClear ? `${className} allow-clear` : className}
                    ref={ref => { this.ref = ref; }}
                />
                {
                    !disabled && !readOnly && allowClear && !!value ? (
                        <Icon 
                            type="close-circle"
                            theme="filled"
                            onClick={this.handleClear}
                        />
                    ) : null
                }
            </div>
        );
    }
}

export default WrapTextArea;
