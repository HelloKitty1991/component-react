/**
 *  @props:
 *      pointX 经度
 *      pointY 纬度
 *      mapDataCallBack 数据回调函数
 *
 */

import React from 'react';
import { Select } from 'antd';
import BaseComponent from '../../BaseComponent';
import markIcon from './images/mark.png';

const { Option } = Select;

export default class AddressMap extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        };
    }

    componentDidMount() {
        let center = [];
        const { pointX } = this.props;
        const { pointY } = this.props;
        if (pointX && pointY) {
            center = [pointY, pointX];
        }
        const defaultParams = {
            resizeEnable: true,
            zoom: 16
        };
        if (center.length > 0) {
            defaultParams.center = center;
        }
        this.Map = new window.AMap.Map('GaoDeMap', defaultParams);
        window.AMap.service('AMap.PlaceSearch', () => {
            this.placeSearch = new window.AMap.PlaceSearch();
        });
        this.Map.on('complete', () => {
            if (pointX && pointY) {
                this.createMarker({
                    lng: pointY,
                    lat: pointX
                });
            }
        });
    }

    createMarker = location => {
        const { Map } = this;
        if (this.marker) {
            Map.remove([this.marker]);
        }
        this.marker = new window.AMap.Marker({
            icon: markIcon,
            position: [location.lng, location.lat],
            showBuildingBlock: true,
            features: ['bg', 'road'],
            animation: 'AMAP_ANIMATION_DROP',
            draggable: true,
            raiseOnDrag: true
        });
        this.marker.setMap(Map);
    };

    querySearchAsync = value => {
        this.placeSearch.search(value, (status, result) => {
            if (
                status === 'complete'
                && result.info === 'OK'
                && result.poiList
            ) {
                const options = [];
                this.locationMap = {};
                result.poiList.pois.forEach(val => {
                    options.push(
                        <Option key={val.id}
                            value={val.id}
                        >
                            {`${val.address} ${val.name}`}
                        </Option>
                    );
                    this.locationMap[val.id] = val.location;
                });
                this.setState({
                    options
                });
            } else {
                this.setState({
                    options: []
                });
            }
        });
    };

    onChange = value => {
        try {
            this.createMarker(this.locationMap[value]);
            this.Map.setZoomAndCenter(15, this.locationMap[value]);
        } catch (e) {
            this.showErrorMsg('位置信息错误');
        }
    };

    handleSubmit = () => {
        const Marker = this.marker;
        if (Marker) {
            const position = Marker.getPosition();
            const geocoder = new window.AMap.Geocoder({
                extensions: 'all'
            });
            geocoder.getAddress(
                [position.lng, position.lat],
                (status, result) => {
                    this.Map.destroy();
                    if (status === 'complete' && result.info === 'OK') {
                        this.props.callback
                            && this.props.callback({
                                ...position,
                                address: result.regeocode.formattedAddress
                            });
                        this.closeDialog();
                    } else {
                        this.showErrorMsg('地址匹配失败，请稍候重试');
                    }
                }
            );
        } else {
            this.showErrorMsg('请先搜索并标记点位');
        }
    };

    render() {
        const containerCss = {
            width: '100%',
            height: 500
        };
        const searchCss = {
            marginLeft: '10px',
            color: '#777676',
            display: 'inline-block',
            height: '35px',
            width: '260px',
            lineHeight: '35px'
        };

        return (
            <div style={{ position: 'relative', width: 1000 }}>
                <div id="GaoDeMap"
                    style={containerCss}
                ></div>
                <div style={{ position: 'absolute', top: '8px', zIndex: '10' }}>
                    <Select
                        showSearch
                        placeholder="请输入搜索位置"
                        style={searchCss}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        onSearch={this.querySearchAsync}
                        onChange={this.onChange}
                    >
                        {this.state.options}
                    </Select>
                </div>
            </div>
        );
    }
}
