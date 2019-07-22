import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { hashHistory } from 'react-dom'
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar, message } from 'antd';
import axios from 'axios';
import { createHashHistory } from 'history';
import HomePage from './components/HomePage'
import StoreManage from './components/storeManage/StoreManage';
import OrderManage from './components/orderManage/OrderManage';
import GoodsManage from './components/goodsManage/GoodsManage';
import AccountManage from './components/accountManage/AccountManage'
import Goods from './components/goodsManage/goods/Goods';
import config from './config/config';

const { Header, Content, Footer} = Layout;
const history = createHashHistory();
var CancelToken = axios.CancelToken;
var source = CancelToken.source();

/**
 * 控制路由跳转及页面布局的根组件
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: null,
            dealer: Object.assign({}, config.dealer.originDealer),
        }
    }
    
    /**
     * @description 从Session中取得userName,在刷新时保证用户名不丢失
     */
    componentDidMount() {
        axios
            .get(config.url.userId)
            .then(res => {
                if (res.data !== null && res.data !== '') {
                    this.setState({
                        key: res.data,
                    })
                    /* 进一步请求经销商 */
                    axios
                        .get(config.url.dealers + res.data,  {
                            cancelToken: source.token
                        })
                        .then(response => {
                            this.setState({
                                dealer: response.data,
                            })
                        })
                        .catch(e => {
                            if (e.response.status !== 401) {
                                console.log(e.message);
                            }
                        })
                }
            }) 
                        
    }

    
    /**
     * @description 退出登录并消除session
     */
    handleLogout = () => {
        axios.get(config.url.logOut);
        this.setState({
            dealer: Object.assign({}, config.dealer.originDealer),
        });
    }

    /** 
     * @description 改变页面背景,进入时有图片,退出时撤销图片 
     * @param  { String } cmd
     */
    changeBg = (cmd) => {
        if (cmd !== config.homePage.originBgCmd) {
            document.getElementById("background").style.backgroundImage
            = "url(" + config.homePage.imageUrl + ")";
        } else {
            document.getElementById("background").style.backgroundImage
            = config.homePage.originBgCmd;
        }
    }

    
    /**
     * @description 登录成功时设置用户信息
     * @param  {String} userName
     * @param  {String} password
     */
    setUserMessage = (userName, password) => {
        axios
            .get(config.url.logIn, {
                params: {
                    userName: userName,
                    password: password,
                }
            })
            .then(res => {
                const dealerMessage = res.data;
                if (dealerMessage.key !== null && dealerMessage.key !== '') {
                    /* 成功时设置用户名并跳转 */
                    this.setState({
                        dealer: dealerMessage,
                    }, () => {
                        history.push({
                            pathname: "/accountManage/" ,
                        });
                        message.success("登录成功");
                    });                    
                } else {
                    /* 失败提示失败 */
                    message.error("用户名或密码错误")
                }
            })
    }

    render() {
        return (
            <HashRouter history= {hashHistory} >
                <Layout>
                {/* 账户管理、店铺信息管理、货物管理、订单管理 */}
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        {/* 登录并拥有店铺的经销商 */}
                        {
                            this.state.dealer.key !== null && this.state.dealer.storeId !== null &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Avatar size={45} 
                                        src={ config.url.root + this.state.dealer.avatar } 
                                    />
                                </Menu.Item>
                                <Menu.Item key="2">
                                <Link to={"/accountManage/"} >账户管理</Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                <Link to={"/storeManage/"} >店铺管理</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                <Link to={"/goodsManage/"} >货物管理</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                <Link to={"/orderManage/"} >订单管理</Link>
                                </Menu.Item>
                                <Menu.Item key="6" style={{float: "right"}} >
                                <Link to={"/"} 
                                    onClick = { this.handleLogout } 
                                >
                                退出登录
                                </Link>
                                </Menu.Item>
                            </Menu>
                        }
                        {/* 无店铺的经销商 */}
                        {
                            this.state.dealer.storeId === null && this.state.dealer.key !== null &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Avatar size={45} 
                                        src={ config.url.root + this.state.dealer.avatar } 
                                    />
                                </Menu.Item>
                                <Menu.Item key="2">
                                <Link to={"/accountManage/"} >账户管理</Link>
                                </Menu.Item>
                            </Menu>
                        }
                        {/* 未登录的经销商 */}
                        {
                            this.state.dealer.key === null && this.state.dealer.storeId === null &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Link to="/"><Avatar size={45} >未登录</Avatar></Link>
                                </Menu.Item>
                            </Menu>
                        }
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64,  }}>
                        <div id="background" style={{ background: '#fff', padding: 24, minHeight: 625, }} >
                            {/* 有店铺且登录后 */}
                            {
                                this.state.dealer.key !== null && this.state.dealer.storeId !== null &&
                                <Switch>
                                    <Route exact path = "/" 
                                        render = { () => <HomePage 
                                            setUserMessage={ this.setUserMessage } 
                                            changeBg = {this.changeBg}
                                        /> }
                                    />    
                                    <Route exact path = "/storeManage/" component={ props => <StoreManage props={props} stotrId={this.state.dealer.storeId} /> } />
                                    <Route exact path = "/orderManage/" component={ OrderManage } />
                                    <Route exact path = "/goodsManage/" component={ GoodsManage } />
                                    <Route exact path = "/accountManage/" component={ AccountManage } />
                                    <Route exact path = "/goods/:id" component={ Goods } />
                                </Switch>
                            }
                            {/* 无店铺的登陆经销商 */}
                            {
                                this.state.dealer.storeId === null && this.state.dealer.key !== null &&
                                <Switch>
                                    <Route exact path = "/" 
                                        render = { () => <HomePage 
                                            setUserMessage={ this.setUserMessage } 
                                            changeBg = {this.changeBg}
                                        /> }
                                    />    
                                    <Route exact path = "/accountManage/" component={ AccountManage } />
                                </Switch>
                            }  
                            {/* 未登录经销商 */}
                            {
                                this.state.dealer.key === null &&  this.state.dealer.storeId === null &&
                                <Switch>
                                    <Route exact path = "/" 
                                        render = { () => <HomePage 
                                            setUserMessage={ this.setUserMessage } 
                                            changeBg = {this.changeBg}
                                        /> }
                                    />    
                                </Switch>
                            }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>YouPurchase @2019 Created by skr狠人</Footer>
                </Layout>
            </HashRouter>
        );
    }
}

export default App;