import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { Input, Button, message, DatePicker,Radio } from 'antd';
import moment from 'moment';
import axios from 'axios';
import AvatarUpload from './accountManage/AvatarUpload';
import config from '../../config/config';
import RenewPassword from './accountManage/RenewPassword';



class AccountManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dealer: Object.assign({}, config.dealer.originDealer),
            originDealer: Object.assign({}, config.dealer.originDealer),
            visible: false,
        }
    }

    
    /**
     * @description 请求dealer信息
     */
    componentDidMount() {
        axios
            .get(config.url.dealer)
            .then((res) => {
                this.setState({
                    dealer: res.data,
                    originDealer: Object.assign({}, res.data),
                })
            })
    }
    
    /**
     * @description 提交新的经销商信息
     */
    handleSubmit = () => {
        if (!this.checkChange()) {//未改变
            return ;
        }
        var dealer = this.state.dealer;
        axios.put(config.url.dealers, 
                dealer
            ).then((res) => {
                if (res.data !== "saved") {
                    message.error("修改失败");
                } else {
                    let dealer = this.state.dealer;
                    this.setState({
                        originDealer: Object.assign({}, dealer),
                    })
                    message.success("修改成功");
                }
            })
    }

    handleChangePassword = () => {
        this.setState({
            visible: true,
        })
    }

    setDisvisible = () => {
        this.setState({
            visible: false,
        })
    }

    /**
     * @description 绑定输入框的onChange
     * @param  { event } e
     * @param  { String } info
     */
    handleChange = (e, info) => {
        var dealer = this.state.dealer;
        dealer[info] = e.target.value;
        this.setState({
            dealer: dealer,
        })
    }
    
    /**
     * @description 检查用户是否修改信息
     * @returns 改变则返回true
     */
    checkChange = () => {
        const dealer = this.state.dealer;
        const originDealer = this.state.originDealer;
        if (
            dealer.contact === originDealer.contact &&
            dealer.gender === originDealer.gender &&
            dealer.realName === originDealer.realName &&
            dealer.storeId === originDealer.storeId &&
            dealer.userName === originDealer.userName &&
            dealer.birthday === originDealer.birthday
            ){
                return false;
            }
        return true;
    }

    render() {
        return(
        <div style={{position: "relative", textAlign: "center", left: "430px" }}>
            
            <h1 style={{position: "relative", right: "430px"}}>经销商信息</h1>
            <div 
                style={{position: "relative", height: "320px", width: "350px", float: "left", marginTop: "50px"}}
            >
            <RenewPassword visible={ this.state.visible } setDisvisible={ this.setDisvisible } />
                <div 
                    style={{position: "relative", height: "100px", width: "100px", float: "left",}}
                >
                    <AvatarUpload avatar={ config.url.root +  this.state.dealer.avatar } />
                </div>
                <Input addonBefore="用户名"  style={{ marginBottom : "15px", width: "60%", float: "right"}}
                    value={ this.state.dealer.userName } 
                    disabled={true}
                    onChange = {(e) => { this.handleChange(e, "userName") }}
                />
                <span 
                    style={{display: "inline-block", width: "20%", padding: 4, backgroundColor: "#fafafa", 
                        border: "1px solid #d9d9d9", borderRadius: 4}} 
                >
                性别
                </span>
                <Radio.Group value={ this.state.dealer.gender } buttonStyle="solid"
                    style={{ marginBottom : "15px", width: "30%", float: "right" }}
                    onChange={ (e) => {this.handleChange(e, "gender") }}
                >
                    <Radio.Button value={0} style={{ width: "50%", float: "right" }}>男</Radio.Button>
                    <Radio.Button value={1} style={{ width: "50%", float: "right" }}>女</Radio.Button>
                </Radio.Group>
                <Input addonBefore="姓名"  style={{ marginBottom : "15px", width: "60%", float: "right"}}
                    value={ this.state.dealer.realName } 
                    onChange = {(e) => { this.handleChange(e, "realName") }}
                />
                <Input addonBefore="联系方式" style={{marginBottom: "15px"}}
                    value={ this.state.dealer.contact }  
                    onChange = {(e) => { this.handleChange(e, "contact") }}
                />
                <span style={{display: "inline-block", width: "25%", padding: 4, backgroundColor: "#fafafa", border: "1px solid #d9d9d9", borderRadius: 4}} >
                出生日期
                </span>
                <DatePicker format={"YYYY-MM-DD"}
                    style = {{ marginBottom: 15, width: '75%', float: "right", textAlign: "center"}}
                    value={ moment(this.state.dealer.birthday ? this.state.dealer.birthday : moment().format("YYYY-MM-DD"), "YYYY-MM-DD") }
                    onChange = {(e) => {
                        var dealer = this.state.dealer;
                        dealer["birthday"] = e ? e.format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
                        this.setState({
                            dealer: dealer,
                        })
                    }} 
                />
                <Input addonBefore="店铺" style={{display: "inline-block", marginBottom: "15px", width: "70%"}}  
                    value={ this.state.dealer.storeName }
                    disabled={true}
                    placeholder="无"
                />
                <Button  style={{display: "inline-block", marginBottom: "15px", width: "30%"}} 
                    disabled={!this.state.dealer.storeName}
                >
                    <Link 
                        to = {{
                            pathname: "/storeManage/",
                        }}
                    >
                    查看信息
                    </Link>
                </Button>
                <Button style={{display: "inline-block", marginBottom: "15px", width: "25%", marginRight: "20px"}} 
                    onClick = { this.handleSubmit } 
                >
                确认修改
                </Button>
                <Button style={{display: "inline-block", marginBottom: "15px", width: "25%", marginRight: "20px"}} 
                    onClick = { this.handleChangePassword } 
                >
                修改密码
                </Button>
            </div>
        </div>
        );
    }
}

export default AccountManage;