import React from 'react';
import shopMock from '../../mock/shopMock';
import { Input } from 'antd';
import { Button } from 'antd/lib/radio';
import ImageUpload from './change/upload';

class ShopDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shop: {
                key: null, 
                storeName: '', 
                address: '', 
                coverPicUrl: 'http://img2.imgtn.bdimg.com/it/u=2113909108,4103249324&fm=26&gp=0.jpg', 
                contact: '', 
                hours: [],
                dealerId: null,
                dealerName: "",
            },
            originShop: {
                key: null, 
                storeName: '', 
                address: '', 
                coverPicUrl: 'http://img2.imgtn.bdimg.com/it/u=2113909108,4103249324&fm=26&gp=0.jpg', 
                contact: '', 
                hours: [],
                dealerId: null,
                ealerName: "",
            }
        }
    }

    componentDidMount() {
        /* axios function */

        var key = this.props.location.shopKey ? this.props.location.shopKey : 0;
        this.setState({
            shop: shopMock[key],
            originShop: Object.assign({}, shopMock[key]),
        })
    }

    /* 最终提交修改信息的函数 */
    handleChange = () => {
        const shop = this.state.shop;
        const originShop = this.state.originShop;
        if (shop.address !== originShop.address || shop.contact !== originShop.contact 
            || shop.coverPicUrl !== originShop.coverPicUrl || shop.hours[0] !== originShop.hours[0]
            || shop.hours[1] !== originShop.hours[1] || shop.storeName !== originShop.storeName 
            || shop.dealerName !== originShop.dealerName) {

            alert("修改成功");
        } 
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", left: "100px" }}>
            <h1>店面信息</h1>
            <div 
                style={{position: "relative", height: "300px", width: "400px", float: "left", marginRight: "30px", marginTop: "50px"}}
            >
            <ImageUpload />
            </div>
            <div 
                style={{position: "relative", height: "300px", width: "300px", float: "left", marginTop: "100px", marginLeft: "60px"}}
            >
                <Input addonBefore="店名"  style={{ marginBottom : "10px" }}
                    value={ this.state.shop.storeName } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.storeName = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="地址"  style={{marginBottom: "10px"}}
                    value={ this.state.shop.address } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.address = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="联系方式" style={{marginBottom: "10px"}}
                    value={ this.state.shop.contact }  
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.contact = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="营业时间" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.shop.hours[0] } 
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.hours[0] = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Input addonBefore="结束时间" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.shop.hours[1] }
                    onChange = {(e) => {
                        var shop = this.state.shop;
                        shop.hours[1] = e.target.value;
                        this.setState({
                            shop: shop,
                        })
                    }}
                />
                <Button onClick = { this.handleChange } >确认修改</Button>
            </div>
        </div>
        );
    }
}

export default ShopDetail;