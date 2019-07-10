import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { hashHistory } from 'react-dom'
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar } from 'antd';
import avatar from './config/avatar';
import HomePage from './components/HomePage'
import ShopManage from './components/storeManage/StoreManage';
import OrderManage from './components/orderManage/OrderManage';
import GoodsManage from './components/goodsManage/GoodsManage';
import AccountManage from './components/accountManage/AccountManage'
import Goods from './components/goodsManage/goods/Goods';

const { Header, Content, Footer} = Layout;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            logIn: false,
        }
    }

    setUserName = (userName) => {
        this.setState({
            userName : userName,
            logIn: true
        });
    }

    render() {
        return (
            <HashRouter history= {hashHistory} >
                <Layout>
                {/* 账户管理、店铺信息管理、货物管理、订单管理 */}
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        {
                            this.state.userName !== '' &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Link to="/">
                                        <Avatar size={45} 
                                            src={avatar.defaultUrl} 
                                        />
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="2">
                                <Link to={"/accountManage/"+this.state.userName} >{this.state.userName}</Link>
                                </Menu.Item>
                                <Menu.Item key="3">
                                <Link to={"/storeManage/"+this.state.userName} >店铺管理</Link>
                                </Menu.Item>
                                <Menu.Item key="4">
                                <Link to={"/goodsManage/"+this.state.userName} >货物管理</Link>
                                </Menu.Item>
                                <Menu.Item key="5">
                                <Link to={"/orderManage/"+this.state.userName} >订单管理</Link>
                                </Menu.Item>
                            </Menu>
                        }
                        {
                            this.state.userName === '' &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Link to="/"><Avatar size={45} >未登录</Avatar></Link>
                                </Menu.Item>
                            </Menu>
                        }
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64,  }}>
                        <div id="background" style={{ background: '#fff', padding: 24, minHeight: 625, }} >
        
                            <Switch>
                                <Route exact path = "/" 
                                    render = { () => <HomePage setUserName={ this.setUserName } /> }
                                />    
                                <Route exact path = "/storeManage/:userName" component={ ShopManage } />
                                <Route exact path = "/orderManage/:userName" component={ OrderManage } />
                                <Route exact path = "/goodsManage/:userName" component={ GoodsManage } />
                                <Route exact path = "/accountManage/:userName" component={ AccountManage } />
                                <Route exact path = "/goods/:id" component={ Goods } />
                            </Switch>
                        
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>YouPurchase @2019 Created by skr狠人</Footer>
                </Layout>
            </HashRouter>
        );
    }
}

export default App;