import React from 'react';
import { Spin, Input, Button, message } from 'antd';
import AMapJS from "amap-js";
import axios from 'axios';
import config from '../../../../config/config';


let AMapLoader = new AMapJS.AMapJSAPILoader({
    key: config.mapKey,
    v: "1.4.14", // 版本号
    params: {}, // 请求参数
    protocol: "https:" // 请求协议
})

export default class StoreMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            marker: null,
            centerLng: 121.42999,
            centerLat: 31.024654,
            longitude: null,
            latitude: null,
            address: '',
            spinning: true,
        }
    }

    componentDidMount() {
        axios 
            .get(config.url.storeMap.get, {
                params: {
                    storeId: this.props.match.params.storeId,
                }
            })
            .then((res) => {
                this.setState({
                    latitude: res.data.latitude,
                    longitude: res.data.longitude,
                    address: res.data.address,
                }, () => {
                AMapLoader
                    .load()
                    .then(AMap => {
                        let map = new AMap.Map('container', {
                            resizeEnable: true, //是否监控地图容器尺寸变化
                            zoom: 11, //初始化地图层级
                            center: [this.state.longitude ? this.state.longitude : this.state.centerLng, 
                                this.state.latitude ? this.state.latitude : this.state.centerLat],
                        });
                        
                        AMap.plugin(['AMap.Geocoder', 'AMap.ToolBar'], function () {
                            var geocoder = new AMap.Geocoder()
                            map.addControl(geocoder);
                            var toolbar = new AMap.ToolBar();
                            map.addControl(toolbar);
                        })
                        let marker = new AMap.Marker({
                            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                            position: [this.state.longitude, this.state.latitude],
                        });
                        map.add(marker);
                        map.on("click", this.getAddress);
                        this.setState({
                            map: map,
                            marker: marker,
                            spinning: false,
                        })
                    })
                })
                
            })
    }

    getAddress = (e) => {
        AMapLoader
            .load()
            .then(AMap => {
                let geocoder = new AMap.Geocoder();
                let marker = this.state.marker;
                let lnglat = e.lnglat;
                marker.setPosition(lnglat);
                this.setState({
                    longitude: e.lnglat.getLng(),
                    latitude: e.lnglat.getLat(),
                })
                geocoder.getAddress(lnglat, (status, result) => {
                    if (status === 'complete' && result.regeocode) {
                        var address = result.regeocode.formattedAddress;
                        this.setState({
                            address: address,
                        })
                    } else {
                        console.log('根据经纬度查询地址失败')
                    }
                });
            })
    }

    render() {
        return (
        <div>
            <div id="container" style={{ width: 600, height: 400, border: "#000 solid 1px" }}>
                <Spin spinning={this.state.spinning} style={{ position: "relative", top: 180}}/>
            </div>
            <div style={{ width: 600 }}>
            <Input addonBefore={"位置"} style={{width: 500, float: "left"}}
                placeholder={"点击地图获取位置"}
                value={ this.state.address } 
            />
            <Button style={{ float: "right"}}
                onClick={() => {
                    axios
                        .post(config.url.storeMap.post, {
                            address: this.state.address,
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }, {
                            params: {
                                storeId: this.props.match.params.storeId,
                            }
                        })
                        .then((res) => {
                            if (res.data === "UPDATE") {
                                message.success("修改成功")
                            } else {
                                message.error("修改失败")
                            }
                        })
                        .catch((err) => {
                            if (err.response) {
                                console.log(err.message);
                            }
                        })
                }}
            >
            {"修改位置"}
            </Button>
            </div>
        </div>
        );
    }
}
