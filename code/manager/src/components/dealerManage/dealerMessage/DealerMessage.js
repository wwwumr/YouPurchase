import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Input, message, Popconfirm, Button } from 'antd';
import axios from 'axios';
//import dealerData from '../../../mock/dealerMock';
import config from '../../../config/config';
import AvatarUpload from './dealerMessage/AvatarUpload';
import ShopAutoInput from './dealerMessage/ShopAutoInput';

class DealerMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealer: config.dealer.originDealer,
            originDealer: config.dealer.originDealer,
        }
    }

    componentDidMount() {
        
        const key = this.props.match.params.key;
        
        /* axios function */
        axios.get(config.url.dealers+key)
            .then((res) => {
                this.setState({
                    dealer: res.data,
                    originDealer: res.data,
                })
            })
        
        /* mock 
        const dealers = dealerData;
        const dealer = dealers.find((elem) => {
            return elem.key === key;
        })
        this.setState({
            dealer: dealer,
            originDealer: dealer,
        })*/
    }

    handleChange = () => {
        /* axios 
        var dealer = this.state.dealer;
        axios.put(config.url.dealers, 
                dealer
            ).then((res) => {
                if (res.data < 0) {
                    message.error("修改失败");
                } else {
                    message.success("修改成功");
                }
            })
        */
        message.success("修改成功");
    }

    handleUnbind = () => {
        /* axios function 
        axios.get(config.url.stores+"unbind?dealerId="+this.state.dealer.key+"&storeId="+this.state.dealer.storeId)
            .then((res) => {
                if (res.data < 0) {
                    message.error("解除授权失败");
                } else {
                    message.success("授权已取消");
                    var dealer = this.state.dealer;
                    dealer.storeName = "";
                    this.setState({
                        dealer: dealer,
                    })
                }
            })
        */
        message.info("授权已取消");
        var dealer = this.state.dealer;
        dealer.storeName = "";
        this.setState({
            dealer: dealer,
        })
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", left: "430px" }}>
            <h1 style={{position: "relative", right: "430px"}}>经销商信息</h1>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "50px"}}
            >
                <div 
                    style={{position: "relative", height: "100px", width: "100px", float: "left",}}
                >
                    <AvatarUpload avatar={ this.state.dealer.avatar } />
                </div>
                <Input addonBefore="用户名"  style={{ marginBottom : "10px", width: "60%", float: "right"}}
                    value={ this.state.dealer.userName } 
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer.userName = e.target.value;
                        this.setState({
                            dealer: dealer,
                        })
                    }}
                />
                <Input addonBefore="密码"  style={{marginBottom: "10px", width: "60%", float: "right"}}
                    value={ this.state.dealer.password } 
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer.password = e.target.value;
                        this.setState({
                            dealer: dealer,
                        })
                    }}
                />
                <Input addonBefore="姓名"  style={{ marginBottom : "10px", width: "60%", float: "right"}}
                    value={ this.state.dealer.realName } 
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer.realName = e.target.value;
                        this.setState({
                            dealer: dealer,
                        })
                    }}
                />
                <Input addonBefore="地址"  style={{ marginBottom : "10px" }}
                    value={ this.state.dealer.address } 
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer.address = e.target.value;
                        this.setState({
                            dealer: dealer,
                        })
                    }}
                />
                <Input addonBefore="联系方式" style={{marginBottom: "10px"}}
                    value={ this.state.dealer.contact }  
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer.contact = e.target.value;
                        this.setState({
                            dealer: dealer,
                        })
                    }}
                />
                <Input addonBefore="店铺" style={{display: "inline-block", marginBottom: "10px", width: "50%"}}  
                    value={ this.state.dealer.storeName }
                    placeholder="无"
                />
                <Popconfirm
                    title="你确定要取消经销商对该店铺的管理授权吗?" okText="确认" cancelText="取消"
                    disabled={!this.state.dealer.storeName}
                    onConfirm={ this.handleUnbind }
                >
                    <Button  style={{display: "inline-block", marginBottom: "10px", width: "25%"}}  
                    >
                    取消授权
                    </Button>
                </Popconfirm>
                <Button  style={{display: "inline-block", marginBottom: "10px", width: "25%"}} 
                    disabled={!this.state.dealer.storeName}
                >
                    <Link 
                        to = {{
                            pathname: "/shopManage/shopDetail/",
                            storeId: this.state.dealer.storeId,
                        }}
                    >
                    查看信息
                    </Link>
                </Button>
                <ShopAutoInput 
                    storeName = { this.state.dealer.storeName }
                    setShop={(id, name) => {
                        var dealer = this.state.dealer;
                        dealer.storeId = id;
                        dealer.storeName = name;
                        this.setState({
                            dealer: dealer,
                        })
                    }} 
                >
                </ShopAutoInput>
                <Button 
                    onClick = { this.handleChange } 
                >
                确认修改
                </Button>
            </div>
        </div>
        );
    }
}

export default DealerMessage;