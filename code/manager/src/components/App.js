import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import {hashHistory} from 'react-dom'
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar } from 'antd';
import '../assets/App.css';
import HomePage from './HomePage';
import DealerManage from './DealerManage';
import ShopManage from './ShopManage';
import ShopDetail from './shopManage/ShopDetail';
import DealerMessage from './dealerManage/DealerMessage';
import config from '../config/config';

const { Header, Content, Footer} = Layout;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName : '',
            logIn: false
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
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        {
                            this.state.userName !== '' &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Link to="/"><Avatar size={45} 
                                    src={config.avatar.url} 
                                />
                                </Link>
                                </Menu.Item>
                                <Menu.Item key="2">{ this.state.userName }</Menu.Item> 
                                <Menu.Item key="3"><Link to="/dealerManage/">经销商管理</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/shopManage/">店铺管理</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/test/">测试组件</Link></Menu.Item>
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
                    <Content style={{ padding: '0 50px', marginTop: 64, minHeight:"625px" }}>
                        <div id="background" style={{ background: '#fff', padding: 24, minHeight: 625, }} >
        
                            <Switch>
                                <Route exact path = "/" 
                                    render = { () => <HomePage fn={ this.setUserName } logIn={this.state.logIn} /> }
                                />
                                <Route exact path = "/dealerManage/" component = { DealerManage }></Route>
                                <Route exact path = "/dealerManage/dealerMessage/" component = { DealerMessage } ></Route>
                                
                                <Route exact path = "/shopManage/" component = { ShopManage }></Route>
                                <Route exact path = "/shopManage/shopDetail/" component = { ShopDetail } ></Route>
                                
                                <Route path = "/test/" component= { DealerMessage } ></Route>
                            </Switch>
                        
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>YouPurchase @2019 Created by skr狠人</Footer>
                </Layout>
            </HashRouter>
        )
    }    
}

export default App;