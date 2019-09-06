import React from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import { hashHistory } from 'react-dom'
import { createHashHistory } from 'history';
import 'antd/dist/antd.css';
import { Layout, Menu, Avatar } from 'antd';
import axios from 'axios';
import HomePage from './HomePage';
import DealerManage from './dealerManage/DealerManage';
import ShopManage from './shopManage/ShopManage';
import ShopDetail from './shopManage/shopDetail/ShopDetail';
import DealerMessage from './dealerManage/dealerMessage/DealerMessage';
import config from '../config/config';
import TagManage from './tagManage/TagManage';
import AlcoholManage from './alcoholManage/AlcoholManage';
import AlcoholDetail from './alcoholManage/alcoholDetail/AlcoholDeatail';

axios.defaults.withCredentials = true;

const { Header, Content, Footer} = Layout;
const history = createHashHistory();

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName : '',
        }
    }
    /**
     * @description 刷新页面时重新获取userName
     */
    componentDidMount() {
        axios
            .get(config.url.userName.get)
            .then((res) => {
                if (res.data.type === config.homePage.adminLogIn) {
                    this.getUserName(res.data.userName);
                }
            })
            .catch(err => {
                if (err.response) {
                    console.log(err.message)
                }
            })
    }

    /**
     * @description 当刷新时userName不为空时设置userName
     * @param   {String } userName
     */
    getUserName = (userName) => {
        if (userName !== '' && userName !== null) {
            this.setState({
                userName: userName,
            })
            this.changeBg(config.homePage.originBgCmd);
        }
    }

    /**
     * @description 当登录时userName不为空时设置userName, 否则改为退出登录
     * @param   {String } userName
     */
    setUserName = (userName) => {
        if (userName !== '' && userName !== null ) {
            this.setState({
                userName : userName,
            }, () => {
                this.changeBg(config.homePage.originBgCmd);
                history.push({
                    pathname: "/shopManage/",
                });
            });
        } else {
            axios.get(config.url.root+"logout");
            this.setState({
                userName : '',
            });
        }
    }

    /** 
     * @description 改变页面背景,进入时有图片,退出时撤销图片 
     * @param  { String } cmd
     */
    changeBg = (cmd) => {
        if (cmd !== config.homePage.originBgCmd) {
            document.getElementById("background").style.backgroundImage
            = "url(" + config.homePage.homePageImageUrl + ")";
        } else {
            document.getElementById("background").style.backgroundImage
            = config.homePage.originBgCmd;
        }
    }

    render() {
        return (
            <HashRouter history= {hashHistory} >
                <Layout>
                    {/* 导航条 */}
                    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                        <div className="logo" />
                        {/* 登录后管理员 */}
                        {
                            this.state.userName !== '' && this.state.userName !== null &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Avatar size={45} 
                                        src={config.url.root + config.avatar.url} 
                                    />
                                </Menu.Item>
                                <Menu.Item key="2"><Link to="/dealerManage/">经销商管理</Link></Menu.Item>
                                <Menu.Item key="3"><Link to="/shopManage/">店铺管理</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/tagManage/">标签管理</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/alcoholManage/">酒商品管理</Link></Menu.Item>
                                <Menu.Item key="6" style={{float: "right"}}>
                                    <Link to="/" onClick={()=>{
                                        this.setUserName('')
                                    }}>
                                    退出登录
                                    </Link>
                                </Menu.Item> 
                            </Menu>
                        }
                        {/* 未登录管理员 */}
                        {
                            (this.state.userName === '' || this.state.userName === null) &&
                            <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} >
                                <Menu.Item key="1">
                                    <Link to="/"><Avatar size={45} >未登录</Avatar></Link>
                                </Menu.Item>
                            </Menu>
                        }
                    </Header>
                    {/* 页面主要内容 */}
                    <Content style={{ padding: '0 50px', marginTop: 64, minHeight:"625px" }}>
                        <div id="background" style={{ background: '#fff', padding: 24, minHeight: 625, }} >
                        {/* 登录后管理员 */}
                        {
                            this.state.userName !== '' && this.state.userName !== null &&
                            <Switch>
                                <Route exact path = "/" 
                                    render = { () => 
                                    <HomePage 
                                        setUserName={ this.setUserName } 
                                        changeBg={ this.changeBg }
                                    />}
                                />
                                <Route exact path = "/dealerManage/" component = { DealerManage }></Route>
                                <Route exact path = "/dealerManage/dealerMessage/:key" component = { DealerMessage } ></Route>
                                <Route path = "/shopManage/" component = { ShopManage }></Route>
                                <Route path = "/shopManage/shopDetail/:key" component = { ShopDetail } ></Route>       
                                <Route exact path = "/tagManage/" component = { TagManage }></Route>
                                <Route exact path = "/alcoholManage/" component = { AlcoholManage }></Route>
                                <Route exact path = "/alcoholManage/alcoholDetail/:alcoholId" component = { AlcoholDetail }></Route>
                            </Switch>
                        }
                        {/* 未登录管理员 */}
                        {
                            (this.state.userName === '' || this.state.userName === null) &&
                            <Switch>
                                <Route path = "/" 
                                    render = { () => 
                                    <HomePage 
                                        setUserName={ this.setUserName } 
                                        changeBg={ this.changeBg }
                                    />}
                                />
                            </Switch>
                        }
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>YouPurchase @2019 Created by skr狠人</Footer>
                </Layout>
            </HashRouter>
        )
    }    
}

export default App;