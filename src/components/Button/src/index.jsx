import React, { Component } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const { Group } = Button;

class WrapButton extends Component {
    static propTypes = {
        children: PropTypes.string,
        onClick: PropTypes.func,
        type: PropTypes.string,
        unLoading: PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    handleClick = () => {
        const { onClick, type, unLoading } = this.props;

        if (type && type === 'submit' && !unLoading) {
            this.setState({
                loading: true
            });
        }
        onClick && onClick(this.changeLoading);
    }

    changeLoading = () => {
        this.setState({
            loading: false
        });
    }

    render() {
        const { loading } = this.state;
        const { type } = this.props;
        return (
            <Button
                className={type ? `btn-${type}` : ''}
                loading={loading}
                {...this.props}
                onClick={this.handleClick}
            >
                {loading ? '提交中...' : this.props.children}
            </Button>
        );
    }
}

WrapButton.Group = Group;

export default WrapButton;
