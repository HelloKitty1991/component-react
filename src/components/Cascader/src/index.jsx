import difference from '@hello/utils/lib/difference';
import { Col, Row } from 'antd';
import Classnames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import BaseComponent from '../../BaseComponent';
import Select from '../../Select';

export default class Cascader extends BaseComponent {
    constructor(props) {
        super(props);
        this.originUrls = props.options.map(v => v.url);
        this.state = {
            errors: [],
            values: props.value || [],
            urls: (props.options || []).map((v, r) => {
                if (props.value) {
                    return v.url.replace(/{(.*?)}/g, (_, b) => {
                        return get(props, `value[${r - 1}].${b}`);
                    });
                }
                return v.url;
            })
        };
        this.refMap = new Map();
    }

    componentDidMount() {
        if (typeof this.props.getInstance === 'function') {
            this.props.getInstance(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (
            Object.keys(difference(nextProps.options, this.props.options))
                .length
      || Object.keys(difference(nextProps.value, this.props.value)).length
        ) {
            const urls = (nextProps.options || []).map((v, r) => {
                if (nextProps.value) {
                    return v.url.replace(/{(.*?)}/g, (_, b) => get(nextProps, `value[${r - 1}].${b}`));
                }
                return v.url;
            });
            this.setState({
                values: nextProps.value || [],
                urls
            });
        }
    }

  onChange = (value, index, opts) => {
      const { originUrls } = this;
      const { options } = this.props;
      const { values } = this.state;
      for (let i = index + 1; i < options.length; i++) {
          values[i] = undefined;
          const ref = this.refMap.get(index);
          if (ref) {
              ref.clearOptions();
          }
      }
      values[index] = value;
      this.setState({ values });
      if (this.props.onChange) {
          this.props.onChange(values, get(opts, 'props.allValue'), index);
      }
      if (originUrls && originUrls[index + 1] && originUrls[index + 1]) {
          const url = originUrls[index + 1].replace(/{(.*?)}/g, (_, b) => get(value, b));
          const { urls } = this.state;
          urls[index + 1] = url;
          this.setState({ urls });
      }
  };

  render() {
      const {
          options = [],
          layout,
          style,
          disabled,
          showInitData = true
      } = this.props;
      const { values, urls } = this.state;
      const select = options.map((opt, index) => {
          return (
              <Col span={layout === 'column' ? 24 : 24 / options.length}
                  key={index}
              >
                  <Select
                      className={Classnames({
                          has_error: this.state.errors.includes(index)
                      })}
                      ref={ref => {
                          this.refMap.set(index, ref);
                      }}
                      style={style}
                      disabled={disabled}
                      showInitData={showInitData}
                      value={values[index]}
                      {...opt}
                      url={urls[index]}
                      placeholder={opt.placeholder || `请选择${opt.label}`}
                      onChange={(value, items) => this.onChange(value, index, items)}
                  />
              </Col>
          );
      });
      return (
          <Row
              className={'klc-cascader'}
              style={{ flexDirection: layout }}
              gutter={10}
          >
              {select}
          </Row>
      );
  }
}
