import React from 'react';
import { Statistic, Row, Col, Table } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

const columns = [
    {
        title: "商品",
        dataIndex: "commodityCoverPicUrl",
        key: "1",
        render: (text) => 
            <img src={config.url.root + text} alt="商品图片"
                style={{width: 80, height: 80, }}
            />
    },{
        title: "商品信息",
        dataIndex: "commodityInfo",
        key: "2",
        width: "20%",
    },{
        title: "商品单价",
        dataIndex: "price",
        key: "3",
        sorter: (a, b) => a.price - b.price,
    },{
        title: "卖出总量",
        dataIndex: "amount",
        key: "4",
        sorter: (a, b) => a.amount - b.amount,
    },{
        title: "卖出总价",
        dataIndex: "totalPrice",
        key: "5",
        sorter: (a, b) => a.totalPrice - b.totalPrice,
    }
]

export default class OrderStatistics extends React.Component {

    state = {
        key: null,
        orderList: [],
        totalPrice: null,
        orderItemList: [],
    }
    
    componentDidMount() {
        axios
            .get(config.url.orderInfo)
            .then(res => {
                this.setState({
                    orderList: res.data,
                }, this.analize)
            })
            .catch((err) => {
                if (err.response) {
                    console.log(err.message);
                }
            })
    }

    analize = () => {
        let orderList = this.state.orderList;
        /* 计算总价 */
        let totalPrice = 0;
        orderList.forEach((elem) => {
            totalPrice += elem.totalPrice;
        });
        /* 计算商品销量及价格 */
        let orderItemIdList = [], orderItemList = [];
        /* 遍历orderList的orderItemList获取商品id */
        orderList.forEach((elem) => {
            elem.orderItemList.forEach(element => {
                if (orderItemIdList.indexOf(element["commodityId"]) < 0) {
                    orderItemIdList.push(element["commodityId"]);
                }
            })    
        })
        /* 遍历orderItemList并计算每个商品的属性 */
        orderList.forEach((element) => {
            element.orderItemList.forEach(elem => {
                /* 如果已有属性则读取,没有则添加 */
                let pos = orderItemIdList.indexOf(elem.commodityId);
                if (pos >= 0) {
                    let orderItem = Object.assign({}, config.orderItem); 
                    if (orderItemList[pos] !== undefined && orderItemList[pos] !== null) {
                        orderItem = orderItemList[pos];
                        orderItem.amount += elem.amount;
                    } else {
                        orderItem.commodityId = elem.commodityId;
                        orderItem.price = elem.price;
                        orderItem.commodityInfo = elem.commodityInfo;
                        orderItem.commodityCoverPicUrl = elem.commodityCoverPicUrl;
                        orderItem.amount = elem.amount;
                    }
                    orderItem.totalPrice = orderItem.amount * orderItem.price;
                    orderItemList[pos] = orderItem;
                }   
            })
        })
        /* 保存状态 */
        this.setState({
            totalPrice: totalPrice,
            orderItemList: orderItemList,
        })
    }

    render() {
        return (
        <div style={{margin: 20, textAlign: "center"}}>
            <Row gutter={16} style={{marginBottom: 20, }}>
                <Col span={6} offset={5}>
                <Statistic title="累计订单数" value={this.state.orderList.length} />
                </Col>
                <Col span={6} >
                <Statistic title="累计收入(￥)" value={this.state.totalPrice} precision={2} />
                </Col>
            </Row>
            <Row>
                <Col span={20} offset={2}>
                    <Table rowKey={"commodityId"} columns={columns} dataSource={this.state.orderItemList} />
                </Col>
            </Row>
        </div>
        );
    }
}