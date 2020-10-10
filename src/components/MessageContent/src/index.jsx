import React from 'react';
import PropTypes from 'prop-types';

export default class MessageContent extends React.Component {
    static propTypes = {
        countDown: PropTypes.number,
        title: PropTypes.any,
        msg: PropTypes.any,
        callback: PropTypes.func,
        type: PropTypes.string,
        size: PropTypes.number,
        iconStyle: PropTypes.object,
        contentStyle: PropTypes.object,
        btnGroup: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            countDown: props.countDown,
            title: props.countDown
                ? this.replace(props.title, props.countDown)
                : props.title,
            msg: props.countDown
                ? this.replace(props.msg, props.countDown)
                : props.msg
        };
        this.titleStyle = {
            textAlign: 'center',
            fontSize: 16,
            color: '#333',
            fontWeight: 'bold'
        };
        this.contentStyle = {
            ...this.titleStyle,
            fontSize: 14,
            fontWeight: 'normal',
            marginTop: 5
        };
        this.msg = props.msg;
        this.title = props.title;
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillMount() {
        if (this.state.countDown) {
            this.updateText();
            this.timer = setInterval(this.updateText, 1000);
        }
    }

    replace = (text, countDown) => {
        return text.replace(/\{(.*)\}/, countDown);
    };

    updateText = () => {
        let { countDown } = this.state;
        if (countDown <= 0) {
            clearInterval(this.timer);
            this.timer = null;
            this.props.callback && this.props.callback();
            return;
        }
        countDown--;
        this.setState({
            title: this.replace(this.title, countDown),
            msg: this.replace(this.msg, countDown),
            countDown
        });
    };

    getIcon = (type, size = 36, iconStyle) => {
        iconStyle = { marginBottom: 13, ...iconStyle || {} };
        return (
            <svg
                width={size}
                height={size}
                style={iconStyle}
            >
                <use xlinkHref={`#icon-${type}`}/>
            </svg>
        );
    };

    render() {
        const { title, msg } = this.state;
        return (
            <div className="custom-modal-content"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                {this.getIcon(this.props.type, this.props.size || 36, this.props.iconStyle)}
                {title ? <div style={this.titleStyle}>{title}</div> : null}
                {msg ? <div style={Object.assign(this.contentStyle, this.props.contentStyle || {})}>{msg}</div> : null}
                {this.props.btnGroup}
            </div>
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }
}
