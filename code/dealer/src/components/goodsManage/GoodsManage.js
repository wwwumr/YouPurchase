
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import GoodsList from './goodsMange/GoodsList';
import TagManage from './goodsMange/TagManage';
import NewGoods from './goodsMange/NewGoods';

const { Header, Content } = Layout;

class GoodsManage extends React.Component {

    render() {
        return (
            <Layout style={{ background: '#fff'}}>
                <Header style={{ height: 50, background: "#fff"}}>
                    <Menu theme="light" >
                        <Menu.Item key="0" style={{display: "inline", marginRight: 50, background: "#000", }}>
                        <Link to="/goodsManage/" style={{display: "inline", color: "#fff"}}>商品分类</Link>
                        </Menu.Item>
                        <Menu.Item key="1" style={{display: "inline"}}>
                        <Link to="/goodsManage/NewGoods/" style={{display: "inline"}}>增加商品</Link>
                        </Menu.Item>
                        <Menu.Item key="2" style={{display: "inline"}}>
                        <Link to="/goodsManage/NewGoods/" style={{display: "inline"}}>酒厂进货</Link>
                        </Menu.Item>
                        <Menu.Item key="3" style={{display: "inline"}}>
                        <Link to="/goodsManage/TagManage/" style={{display: "inline"}}>标签管理</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout >
                    <Content style={{background: '#fff'}}>
                        <Switch>
                            <Route exact path={"/goodsManage/"} component={ GoodsList } />
                            <Route exact path={"/goodsManage/NewGoods/"} component={NewGoods}></Route>
                            <Route exact path={"/goodsManage/TagManage/"} component={TagManage}></Route>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default GoodsManage;