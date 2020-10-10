import { Cascader, message } from 'antd';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import BaseComponent from '../../BaseComponent';


export default class Region extends BaseComponent {
    static propTypes = {
        value: PropTypes.any,
        level: PropTypes.number,
        onChange: PropTypes.func
    }

    async componentDidMount() {
        const { level, value } = this.props;
        await this.initRegionData(this.props.value);
        if (level === 2 && value) {
            this.setState({
                value: [value.parent_id, value.id]
            });
        }
    }

    // eslint-disable-next-line react/no-deprecated
    componentWillReceiveProps(nextProps) {
        if (get(this.props, 'value.id') !== get(nextProps, 'value.id')) {
            if (Array.isArray(nextProps.value)) {
                this.setState({ value: nextProps.value });
            } else {
                this.initRegionData(nextProps.value);
            }
        }
    }

    getRegionCode = async region => {
        const { level = 3 } = this.props;
        if (Array.isArray(region)) {
            region = region.length ? region[region.length - 1] : '';
        } else {
            region = region.id || region;
        }
        
        if (region) {
            try {
                let data = await window.request('/common/place/', { params: { id: region, level } });
                data = data && data.length ? data[0] || {} : {};
                let province; 
                let city; 
                let area;
                if (level === 3) {
                    province = data.province_id;
                    city = data.parent_id;
                    area = region;
                } else {
                    province = data.parent_id;
                    city = region;
                }
                return {
                    province,
                    city,
                    area
                };
            } catch (err) {
                this.showErrorMsg(err.message);
                return {};
            }
        }
        return {};
    };

    getRegionOption = opts => {
        const target = opts[opts.length - 1];
        const { level } = this.props;
        return new Promise((resolve, reject) => {
            window.request(
                `/common/place/?level=${level === 2 && target.level + 1 > 2 ? target.level : target.level + 1}&parent=${
                    target.value
                }&page_size=500`
            )
                .then(data => {
                    const options = [];
                    data
                        && data.forEach(item => {
                            options.push({
                                value: item.id,
                                label: item.name,
                                level: target.level + 1,
                                isLeaf: level === 2 ? target.level + 1 === 2 : target.level + 1 === 3
                            });
                        });
                    if (!target.value) {
                        this.setState({ options }, resolve);
                    } else {
                        target.children = options;
                        this.setState(state => {
                            return {
                                options: [...state.options]
                            };
                        }, resolve);
                    }
                })
                .catch(err => {
                    message.error(err.message);
                    reject(err);
                });
        });
    };

    handleChange = value => {
        this.setState({ value });
        this.props.onChange && this.props.onChange(value);
    };

    async initRegionData(region) {
        if (region) {
            const { province, city, area } = await this.getRegionCode(region);
            this.setState({
                options: [],
                value: province && city && area ? [province, city, area] : []
            });
            await this.getRegionOption([
                {
                    level: 0,
                    value: ''
                }
            ]);
            const provinceObj = this.state.options.find(
                item => item.value === province
            );
            if (!provinceObj) return;
            provinceObj.level = 1;
            await this.getRegionOption([provinceObj]);
            const cityObj = provinceObj.children.find(
                item => item.value === city
            );
            cityObj.level = 2;
            await this.getRegionOption([cityObj]);
        } else {
            this.getRegionOption([
                {
                    level: 0,
                    value: ''
                }
            ]);
        }
    }

    render() {
        return (
            <Cascader
                {...this.props}
                style={({ width: '100%', ...this.props.style || {} })}
                placeholder={this.props.level === 2 ? '省/市' : '省/市/区'}
                value={this.state.value}
                options={this.state.options}
                onChange={this.handleChange}
                loadData={this.getRegionOption}
            />
        );
    }
}
