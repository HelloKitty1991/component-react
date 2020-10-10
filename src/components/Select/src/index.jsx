import { Select, Spin } from 'antd';
import { get } from 'lodash';
import React from 'react';
import BaseComponent from '../../BaseComponent';

const { Option, OptGroup } = Select;

class KlcSelect extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            options: this.generateOption(props.options || [])
        };
    }

    componentDidMount() {
        if (this.props.showInitData && this.props.url) {
            this.search('');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.url !== nextProps.url && this.props.showInitData) {
            this.search('');
        } else if (nextProps.options && nextProps.options.length) {
            this.setState({
                options: this.generateOption(nextProps.options)
            });
        }
    }

  search = value => {
      if (this.props.url) {
          this.setState({ loading: true });
          window.request(this.props.url + (value.key || value)).then(data => {
              data = data.results || data;
              const options = this.generateOption(data || []);
              this.setState({ options, loading: false });
          });
      } else {
          this.setState({
              options: []
          });
      }
      this.props.onSearch && this.props.onSearch(value);
  };

  generateOption = options => {
      const opts = (options || []).map(data => {
          let label;
          if (this.props.format) {
              label = this.props.format.replace(
                  /\{(.*?)\}/gi,
                  (str, $0) => get(data, $0) || ''
              );
          } else {
              label = data[this.props.labelProps || 'name'];
          }
          return (
              <Option
                  key={data[this.props.valueProps || 'id']}
                  value={data[this.props.valueProps || 'id']}
                  allValue={data}
              >
                  {label}
              </Option>
          );
      });
      if (this.props.url && this.props.showInitData && opts.length) {
          return <OptGroup label="推荐值, 输入搜索更多...">{opts}</OptGroup>;
      } 
      return opts;
  };

  renderNotFoundContent = () => {
      const { loading } = this.state;
      if (loading) {
          return <Spin size="small" />;
      }
      return <span style={{ marginLeft: 2 }}>{this.props.url ? '没有匹配的项' : '暂无数据'}</span>;
  };

  clearOptions = () => {
      this.setState({ options: [] });
  }

  render() {
      return (
          <Select
              allowClear
              labelInValue
              disabled={false}
              optionFilterProp="children"
              placeholder={'请选择'}
              filterOption={false}
              notFoundContent={this.renderNotFoundContent()}
              dropdownStyle={({ 
                  maxHeight: '250px',
                  overflowY: 'auto',
                  ...this.props.dropdownStyle || {} 
              })}
              showSearch={!!this.props.url}
              {...this.props}
              style={({ width: '100%', flex: 1, ...this.props.style })}
              onSearch={this.search}
          >
              {this.state.options}
          </Select>
      );
  }
}

export default KlcSelect;
