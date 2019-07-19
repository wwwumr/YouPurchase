import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { hashHistory } from 'react-dom'
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar } from 'antd';
import axios from 'axios';
import HomePage from './HomePage';
import DealerManage from './dealerManage/DealerManage';
import ShopManage from './shopManage/ShopManage';
import ShopDetail from './shopManage/shopDetail/ShopDetail';
import DealerMessage from './dealerManage/dealerMessage/DealerMessage';
import config from '../config/config';

axios.defaults.withCredentials = true;

const { Header, Content, Footer} = Layout;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName : '',
            logIn: false
        }
    }

    componentDidMount() {
        /* 刷新时重新获取用户名信息 */
        axios.get(config.url.root + "login/userName").then((res) => {
            this.setUserName(res.data)
        })
    }

    /* 当userName不为空时设置userName, 否则改为退出登录 */
    setUserName = (userName) => {
        if (userName !== '' && userName !== null ) {
            this.setState({
                userName : userName,
                logIn: true,
            });
        } else {
            axios.get(config.url.root+"logout");
            this.setState({
                userName : '',
                logIn: false,
            });
        }
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
                                
                                    <Avatar size={45} 
                                        src={config.url.root + config.avatar.url} 
                                    />
                                
                                </Menu.Item>
                                <Menu.Item key="2"><Link to="/dealerManage/">经销商管理</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/shopManage/">店铺管理</Link></Menu.Item>
                                <Menu.Item key="4" style={{float: "right"}}><Link to="/" onClick={()=>{
                                    this.setUserName('')
                                }}>
                                退出登录
                                </Link>
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
                    <Content style={{ padding: '0 50px', marginTop: 64, minHeight:"625px" }}>
                        <div id="background" style={{ background: '#fff', padding: 24, minHeight: 625, }} >
        
                            <Switch>
                                <Route exact path = "/" 
                                    render = { () => 
                                    <HomePage 
                                        fn={ this.setUserName } 
                                        logIn={this.state.logIn} 
                                        changeBg={ (str) => {
                                            let node = document.getElementById("background");
                                            if (str === "initial") {
                                                node.style.backgroundImage = "initial";
                                            } else {
                                                node.style.backgroundImage = config.homePageImageUrl;
                                            }
                                        }}
                                    /> }
                                />
                                <Route exact path = "/dealerManage/" component = { DealerManage }></Route>
                                <Route exact path = "/dealerManage/dealerMessage/:key" component = { DealerMessage } ></Route>
                                
                                <Route exact path = "/shopManage/" component = { ShopManage }></Route>
                                <Route exact path = "/shopManage/shopDetail/:key" component = { ShopDetail } ></Route>
                                
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