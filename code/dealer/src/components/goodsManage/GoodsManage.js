
import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { Card, Button, Typography, Tooltip, message, Layout, Menu } from 'antd';
import axios from 'axios';
import config from '../../config/config';
import GoodsList from './goodsMange/GoodsList';

const { Paragraph } = Typography;
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

    /**
     * @description 删除商品的按钮触发的事件
     * @param  { event } e
     */
    handleRemove = (e) => {
        const key = parseInt(e.target.parentNode.className);
        let goodsList = this.state.goodsList.filter((elem) => {
            return elem.key !== key;
        })
        this.setState({
            goodsList: goodsList,
        })
        axios
            .delete(config.url.goods, {
                data: [key],
            })
            .then(res => {
                if (res.data && res.data === "DELETE") {
                    message.success("删除成功");
                }
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    /**
     * @description 新增商品的触发事件
     */
    handleOk = () => {
        let goods = this.state.goods;
        let goodsList = this.state.goodsList;
        axios
            .post(config.url.goods, goods)
            .then(res => {
                goods.key = res.data.key;
                goods.commodityCoverPicUrl = res.data.coverPicUrl;
                goodsList.push(goods);
                this.setState({
                    goodsList: goodsList,
                    visible: false,
                    goods: Object.assign({}, config.goods.originGoods),
                })
                message.success("增加成功")
            })
    }

    /**
     * @description 绑定输入框的onChange
     * @param  { event } e
     * @param  { String } info
     */
    handleChange = (e, info) => {
        let goods = this.state.goods;
        goods[info] = e.target.value;
        this.setState({
            goods: goods
        })
    }


    /**
     * @description 生成卡片模型展示商品
     * @param { goods } elem
     */
    GoodsItems(elem) {
        return (
            <Card key={elem.key}
                style={{ margin: "20px", height: 310, width: 210, display: "inline-block", }}
            >
                <Link to={"/goods/" + elem.key}>
                    <img alt="商品图片" src={config.url.root + elem.commodityCoverPicUrl} style={{ width: 200, height: 200, marginLeft: -20, marginTop: -20 }} />
                </Link>
                <div style={{ height: 140, width: 200, textAlign: "left", marginLeft: -20, }} className={elem.key}>

                    <Link to={"/goods/" + elem.key}>
                        <Paragraph ellipsis={true}>
                            <Tooltip title={elem.commodityInfo}>
                                <font style={{ color: "blue" }}>
                                    {elem.commodityInfo}
                                </font>
                            </Tooltip>
                        </Paragraph>
                    </Link>

                    <p style={{ margin: -2, marginTop: -10, marginLeft: 2 }}>
                        <font style={{ color: "orange", fontSize: 20 }}>
                            {"￥" + elem.price}
                        </font>
                    </p>
                    
                    <p style={{ margin: -2, marginLeft: 2, display: "inline-block", }}>
                        {"库存量:" + elem.inventory}
                    </p>

                    <p style={{ position: "relative", left: 5, margin: -2, marginLeft: 2, display: "inline-block", }}>
                        {elem.onShelves ? "上架量:" + elem.remaining : "未上架"}
                    </p>

                    

                    <Button size="small" type="primary" style={{ position: "absolute", display: "block", marginTop: -10, bottom: 1, right: 1 }}
                        onClick={this.handleRemove}
                    >
                        删除商品
                </Button>
                </div>
            </Card>);
    }

    render() {
        /* 卡片模型 
        const GoodsList = this.state.goodsList.length === 0 ? '' : this.state.goodsList.map((elem) => (
            this.GoodsItems(elem)
        )
        );*/

        return (
            <Layout style={{ background: '#fff'}}>
                <Header style={{ height: 50, background: "#fff"}}>
                    <Menu theme="light" >
                        <Menu.Item key="0" style={{display: "inline", marginRight: 50, background: "#000", color: "#fff"}} width={100}>
                        {"商品分类"}
                        </Menu.Item>
                        <Menu.Item key="1" style={{display: "inline"}}>
                        增加商品
                        </Menu.Item>
                        <Menu.Item key="2" style={{display: "inline"}}>
                        酒厂进货
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
                        </Switch>
                        
                    </Content>
                </Layout>
            </Layout>
        );
    }


}

export default GoodsManage;