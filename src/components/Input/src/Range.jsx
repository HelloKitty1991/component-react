import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';
import Input from './Input';

const { Group } = Input;

class Range extends PureComponent {
    static defaultProps = {
        connect: '至'
    }

    static propTypes = {
        startPlaceholder: PropTypes.string,
        endPlaceholder: PropTypes.string,
        value: PropTypes.object,
        onChange: PropTypes.func,
        connect: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            start: '',
            end: ''
        };
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            const { value } = nextProps;
            if (!isEqual(value, isEqual)) {
                this.setState({
                    ...this.state,
                    ...value || {
                        start: '',
                        end: ''
                    } 
                });
            }
        }
    }

    handleChange = (e, type) => {
        const { onChange } = this.props;
        if (onChange) {
            const values = { ...this.state, [type]: e.target.value };
            if (!values.start && !values.end) {
                onChange();
            } else {
                onChange(values);
            }
        }
    }

    render() {
        const { connect, startPlaceholder, endPlaceholder } = this.props;
        const { start, end } = this.state;
        return (
            <Group>
                <Row>
                    <Col span={11}>
                        <Input
                            onChange={ (e) => this.handleChange(e, 'start') }
                            value={ start }
                            placeholder={ startPlaceholder || '请输入起始内容' }
                        />
                    </Col>
                    <Col
                        span={2}
                        style={{ textAlign: 'center' }}
                    >
                        { connect }
                    </Col>
                    <Col span={11}>
                        <Input
                            onChange={ (e) => this.handleChange(e, 'end') }
                            value={ end }
                            placeholder={ endPlaceholder || '请输入截止内容'}
                        />
                    </Col>
                </Row>
            </Group>
        );
    }
}

export default Range;
