import React from 'react';
import { HashRouter, Route, Switch, Link, } from 'react-router-dom';
import { hashHistory } from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu } from 'antd';
import StoreMessage from './storeManage/storeMessage';
import StoreImg from './storeManage/StoreImg';
import StoreMap from './storeManage/StoreMap';

const {  Content, Sider } = Layout;


class StoreManage extends React.Component {
    

    render() {
        return(
        <HashRouter history= {hashHistory} >
        <Layout >
            <Layout style={{background: '#fff'}}>
                <Sider theme="light" style={{marginLeft: 100, marginTop: 64, overflow: "auto", }}>
                    <Menu theme="light" mode="inline" >
                        <Menu.Item key="1">
                        <Link to={"/storeManage/"} >店铺信息</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <Link to={"/storeManage/storeImg/"} >封面图片</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <Link to={"/storeManage/storeMap/"} >位置设置</Link> 
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{  marginTop: 64,}}>
                <div  style={{ marginLeft: 24, width: 800, height: 400, textAlign: "center"}} >
                    <Switch>
                        <Route exact path="/storeManage/" 
                            render = {(props) => <StoreMessage {...props}/>} 
                        >
                        </Route>
                        <Route exact path="/storeManage/storeImg/" 
                            render = {(props) => <StoreImg {...props} />} 
                        >
                        </Route>
                        <Route exact path="/storeManage/storeMap/" 
                            render = {(props) => <StoreMap {...props} />} 
                        >
                        </Route>
                    </Switch>
                </div>
                </Content>
            </Layout>
        </Layout>
        </HashRouter>
        );
    }
}
export default StoreManage;