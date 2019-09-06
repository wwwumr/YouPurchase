import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Typography, Tooltip, Layout, Menu, message } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

const { Paragraph } = Typography;
const { Sider, Content } = Layout;

export default class GoodsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            goodsList: [],
            goodsClass: [],
            targetClassId: null,
            targetGoodsList: [],
        }
    }

    /**
     * @description 获取商品信息和类别信息
     */
    componentDidMount() {
        axios
            .get(config.url.storeGoods)
            .then(res => {
                this.setState({
                    goodsList: res.data,
                    targetGoodsList: res.data,
                })
            })
            .catch(err => {
                console.log(err.message)
            })
        axios
            .get(config.url.goodsClass.get)
            .then((res) => {
                this.setState({
                    goodsClass: res.data,
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
        let targetGoodsList = this.state.targetGoodsList.filter((elem) => {
            return elem.key !== key;
        })
        this.setState({
            goodsList: goodsList,
            targetGoodsList: targetGoodsList,
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
     * @description 处理侧边栏选定商品类别
     * @param  {event} e
     */
    handleSelectClass = (e) => {
        let targetGoodsList = this.state.goodsList.filter((elem) => {
            return elem === parseInt(e.key);
        })
        this.setState({
            targetGoodsList: targetGoodsList,
            targetClassId: parseInt(e.key),
        })
    }

    /**
     * @description 恢复侧边栏默认商品
     */
    handleDefaultClass = () => {
        let targetGoodsList = this.state.goodsList;
        this.setState({
            targetGoodsList: targetGoodsList,
            targetClassId: null,
        })
    }

    /**
     * @description 生成卡片模型展示商品
     * @param { goods } elem
     */
    GoodsItems(elem) {
        return (
            <Card key={elem.key}
                style={{ margin: "20px", height: 290, width: 190, display: "inline-block", }}
            >
                <Link to={"/goods/" + elem.key}>
                    <img alt="商品图片" src={config.url.root + elem.commodityCoverPicUrl} style={{ width: 180, height: 180, marginLeft: -20, marginTop: -20 }} />
                </Link>
                <div style={{ height: 140, width: 190, textAlign: "left", marginLeft: -20, }} className={elem.key}>

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
        return (
            <Layout>
            <Sider theme="light" style={{textAlign: "center", }}>
                <Menu theme="light" style={{textAlign: "center"}}>
                    <Menu.Item key="default" 
                        onClick={ this.handleDefaultClass }
                    >
                    全部
                    </Menu.Item>
                    {/* 动态生成商品标签 */}
                    {
                        this.state.goodsClass.length === 0 ? '' :
                        this.state.goodsClass.map((elem) => {
                            return (
                                <Menu.Item key={elem}
                                    onClick={ this.handleSelectClass }
                                >
                                {elem}
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </Sider>
            <Content style={{background: '#fff'}}>
                {/* 动态生成对应类别的商品 */}
                <ul>
                {this.state.targetGoodsList.length === 0 ? '' : 
                    this.state.targetGoodsList.map((elem) => (
                    this.GoodsItems(elem)
                ))}
                </ul>
            </Content>
            </Layout>
            
        );
    }
}