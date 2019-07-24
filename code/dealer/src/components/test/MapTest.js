import React from 'react';
import AMapJS from "amap-js";


let AMapLoader = new AMapJS.AMapJSAPILoader({
    key: "29e2ca8db90b7c1fa55dd09e4ce13414",
    v: "1.4.14", // 版本号
    params: {}, // 请求参数
    protocol: "https:" // 请求协议
})

export default class MapTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            marker: null,
            centerLng: 116.397428,
            centerLat: 39.90923,
        }
    }

    componentDidMount() {
        AMapLoader
            .load()
            .then(AMap => {
                let map = new AMap.Map('container', {
                    resizeEnable: true, //是否监控地图容器尺寸变化
                    zoom: 11, //初始化地图层级
                    center: [this.state.centerLng, this.state.centerLat],
                });
                
                AMap.plugin(['AMap.Geocoder', 'AMap.ToolBar'], function () {
                    var geocoder = new AMap.Geocoder()
                    map.addControl(geocoder);
                    var toolbar = new AMap.ToolBar();
                    map.addControl(toolbar);
                })
                let marker = new AMap.Marker({
                    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    position: [this.state.lng, this.state.lat],
                });
                map.add(marker);
                map.on("click", this.getAddress);
                this.setState({
                    map: map,
                    marker: marker,
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
                geocoder.getAddress(lnglat, function (status, result) {
                    if (status === 'complete' && result.regeocode) {
                        var address = result.regeocode.formattedAddress;
                        console.log(address);
                    } else {
                        console.log.error('根据经纬度查询地址失败')
                    }
                });
            })
    }

    render() {
        return (
            <div id="container" style={{ width: 600, height: 400 }}></div>
        );
    }
}
