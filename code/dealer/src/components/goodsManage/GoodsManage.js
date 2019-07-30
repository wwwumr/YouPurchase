
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import config from '../../config/config';
import GoodsList from './goodsMange/GoodsList';
import TagManage from './goodsMange/TagManage';
import NewGoods from './goodsMange/NewGoods';

const { Header, Content } = Layout;

class GoodsManage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            goodsList: [],
            visible: false,
            goods: Object.assign({}, config.goods.originGoods),
            goodsTags: [],
        }
    }


    /**
     * @description 获取商品信息
     */
    componentDidMount() {
        axios
            .get(config.url.storeGoods)
            .then(res => {
                this.setState({
                    goodsList: res.data,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
    }

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
                        增加标签
                        </Menu.Item>
                        <Menu.Item key="4" style={{display: "inline"}}>
                        更改标签
                        </Menu.Item>
                    </Menu>
                </Header>
                <Layout >
                    <Content style={{background: '#fff'}}>
                        <Switch>
                            <Route exact path={"/goodsManage/"} 
                                render={(props) => <GoodsList {...props} goodsList={this.state.goodsList} />} 
                            />
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