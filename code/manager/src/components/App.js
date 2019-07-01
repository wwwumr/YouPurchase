import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import '../assets/App.css';

import HomePage from './HomePage';
import DealerManage from './DealerManage';
import ShopManage from './ShopManage';

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
        },()=>{
            return <Redirect to="/dealerManage" />
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        {
                            this.state.userName !== '' &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Link to="/"><img src="/favicon.ico" alt="user" height="40px" /></Link>
                                </Menu.Item>
                                <Menu.Item key="2">{ this.state.userName }</Menu.Item> 
                                <Menu.Item key="3"><Link to="/dealerManage/">经销商管理</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/shopManage">店铺管理</Link></Menu.Item>
                                                           
                            </Menu>
                        }
                        {
                            this.state.userName === '' &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Link to="/"><img src="/favicon.ico" alt="user" height="40px" /></Link>
                                </Menu.Item>
                            </Menu>
                        }
                    </Header>
                    <Content style={{ padding: '0 50px', marginTop: 64 }}>
                        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
        
                            <Switch>
                                <Route exact path = "/" 
                                    render = { () => <HomePage fn={ this.setUserName } logIn={this.state.logIn} /> }
                                />
                                <Route exact path = "/dealerManage/" component = { DealerManage }></Route>
                                <Route exact path = "/shopManage/" component = { ShopManage }></Route>
                            </Switch>
                        
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>YouPurchase @2019 Created by skr狠人</Footer>
                </Layout>
            </BrowserRouter>
        )
    }    
}

export default App;