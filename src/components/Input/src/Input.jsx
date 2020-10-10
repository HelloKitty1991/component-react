import { Icon, Input } from 'antd';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

const { Group, Search } = Input;
const DEFAULT_MAXLENGTH = 50;

class WrapInput extends PureComponent {
    static propTypes = {
        maxLength: PropTypes.number,
        allowClear: PropTypes.bool,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
        value: PropTypes.any,
        style: PropTypes.object,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        debounce: PropTypes.bool,
        debounceDelay: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            maxLength: props.maxLength || DEFAULT_MAXLENGTH,
            allowClear: typeof props.allowClear === 'undefined' ? true : props.allowClear,
            value: typeof props.value !== 'undefined' ? `${props.value}`.slice(0, props.maxLength || DEFAULT_MAXLENGTH) : '',
            clearIconRight: 10,
        };
        this.onChange = props.debounce && props.onChange ? debounce(props.onChange, props.debounceDelay || 500) : props.onChange;
    }

    handleClear = () => {
        this.setState({ value: '' });
        if (this.props.onChange) {
            this.props.onChange({ target: { value: '' } });
        }
    }

    handleChange = (e) => {
        const { disabled, readOnly } = this.props;
        if (disabled || readOnly) {
            return;
        }
        let value = e.target ? e.target.value : e;
        value = typeof value !== 'undefined' ? `${value}`.slice(0, this.props.maxLength || DEFAULT_MAXLENGTH) : '';
        if (value === this.state.value) {
            return;
        }
        this.setState({ value });
        if (this.onChange && e) {
            if (e.target) {
                e.target.value = value;
            } else {
                e = value;
            }
            e.persist && e.persist();
            this.onChange(e);
        }
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.setState({ value: (`${nextProps.value}` || '').slice(0, nextProps.maxLength || DEFAULT_MAXLENGTH) });
        }
        this.getRight(this.ref);
    }

    componentDidMount() {
        this.getRight(this.ref);
    }

    getRight = debounce((ref) => {
        let right = 10;
        if (ref) {
            const addon = ref.input && ref.input.parentNode.querySelector('.ant-input-group-addon');
            if (addon) {
                right = addon.clientWidth + 5;
            }
        }
        this.setState({
            clearIconRight: right,
        });
    }, 200);

    render() {
        const { value, allowClear } = this.state;
        const {
            disabled, readOnly, className = '', style,
        } = this.props;
        return (
            <div className="klc-input">
                <Input
                    title={value}
                    {...this.props}
                    value={value}
                    onChange={this.handleChange}
                    className={this.state.allowClear ? `${className} allow-clear` : className}
                    style={({ width: '100%', ...style })}
                    ref={(ref) => { this.ref = ref; }}
                    allowClear={false}
                    // allowClear={!disabled && !readOnly && allowClear && value && value.length > 0}
                />
                {
                    !disabled && !readOnly && allowClear && value && value.length > 0
                    && (
                        <Icon
                            type="close-circle"
                            theme="filled"
                            onClick={this.handleClear}
                            style={{ display: 'none', right: `${this.state.clearIconRight}px` }}
                        />
                    )
                }
            </div>
        );
    }
}

WrapInput.Group = Group;
WrapInput.Search = Search;

export default WrapInput;
