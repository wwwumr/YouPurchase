
import React from 'react';
import { Card, Button, Typography, Tooltip, message, Input, Modal, Radio } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import config from '../../config/config';

const { Paragraph } = Typography;
const { TextArea } = Input;


class GoodsManage extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            goodsList: [],
            visible: false,
            goods: Object.assign({}, config.goods.originGoods),
            value: 1,
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
                goods.commodityCoverPicUrl = res.data.commodityCoverPicUrl;
            })
        goodsList.push(this.state.goods);
        this.setState({
            goodsList: goodsList,
            visible: false,
            goods: Object.assign({}, config.goods.originGoods),
        })
        message.success("增加成功")
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
            style={{ margin: "20px", height: 330, width: 210, display: "inline-block", }}
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

                <p style={{ margin: -2, marginLeft: 2 }}>
                    {elem.onShelves ? "上架量:" + elem.remaining : "未上架"}
                </p>

                <p style={{ margin: -2, marginLeft: 2 }}>
                    {"库存量:" + elem.inventory}
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
        /* 卡片模型 */
        const GoodsList = this.state.goodsList.map((elem) => (
                this.GoodsItems(elem)
            )
        );

        return (
            <div >
                <div >
                    <h2 style={{ textAlign: "center" }} >商品信息</h2>
                    <Button  type="primary"
                        style = {{marginLeft: 100, marginBottom: 20}}
                        onClick = {()=>{
                            this.setState({
                                visible: true,
                            })
                        }}
                    >
                    增加商品
                    </Button>
                    {/* 新建商品的弹窗 */}
                    <Modal title="新增输入框"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={() => {this.setState({ visible:false })}}
                        cancelText="取消" okText="确认"
                    >
                    <div style={{position: "relative", width: "60%", left: "20%", textAlign:"center"}}>
                        <h1>商品信息</h1>
                        {/* 商品信息输入 */}
                        <TextArea placeholder="商品信息描述" style={{margin:"10px"}}
                            value={this.state.goods.commodityInfo} 
                            onChange= {(e) => {this.handleChange(e, "commodityInfo")}}>
                        </TextArea>
                        <Input  addonBefore="商品价格" style={{margin:"10px"}}
                            value={this.state.goods.price}
                            onChange= {(e) => {this.handleChange(e, "price")}}>
                        </Input>
                        <Input  addonBefore="商品库存" style={{margin:"10px"}}
                            value={this.state.goods.inventory}
                            onChange= {(e) => {this.handleChange(e, "inventory")}}>
                        </Input> 
                        <Radio.Group value={this.state.goods.onShelves}
                            onChange= {(e) => {this.handleChange(e, "onShelves")}}
                        >
                            <Radio value={true} defaultChecked={true}>上架</Radio>
                            <Radio value={false}>不上架</Radio>
                        </Radio.Group>
                        <Input  addonBefore="上架数量" style={{margin:"10px"}}
                            value={this.state.goods.remaining}
                            disabled={!this.state.goods.onShelves}
                            onChange= {(e) => {this.handleChange(e, "remaining")}}>
                        </Input>
                    </div>
                    </Modal>
                </div>
                <ul>{ GoodsList }</ul>
            </div>
        );
    }

    
}

export default GoodsManage;