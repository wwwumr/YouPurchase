import React from 'react';
import { Card, Button, Typography, Tooltip, message, Input, Modal, Radio } from 'antd';
import goodsMock from '../../mock/goodsMock';
import goodsConfig from '../../config/goods';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const { Paragraph } = Typography;
const { TextArea } = Input;

class GoodsManage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            goodsList: [],
            deleteing: false,
            visible: false,
            goods: goodsConfig.originGoods,
            value: 1,
        }
    }
    
    
    
    componentDidMount() {
        this.setState({
            goodsList: goodsMock,
        })
    }

    handleClick = (e) => {
        const key = parseInt(e.target.parentNode.className);
        var goodsList = this.state.goodsList.filter((elem) => {
            return elem.key !== key;
        })
        this.setState({
            goodsList: goodsList,
        })
    }

    /* 新增商品时的确认函数 */
    handleOk = () => {
        
        console.log(this.state.goods)
        var goods = this.state.goods;
        goods.key=this.state.goodsList.length + 1;
        var goodsList = this.state.goodsList;
        goodsList.push(this.state.goods);
        this.setState({
            goodsList: goodsList,
            visible: false,
        })
        message.success("增加成功")
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
                            onChange= {(e) => {
                                let goods = this.state.goods;
                                goods.commodityInfo = e.target.value;
                                this.setState({ goods: goods })
                            }}>
                        </TextArea>
                        <Input  addonBefore="商品价格" style={{margin:"10px"}}
                            value={this.state.goods.price}
                            onChange= {(e) => {
                                let goods = this.state.goods;
                                goods.price = e.target.value;
                                this.setState({ goods: goods })
                            }}>
                        </Input>
                        <Input  addonBefore="商品库存" style={{margin:"10px"}}
                            value={this.state.goods.inventory}
                            onChange= {(e) => {
                                let goods = this.state.goods;
                                goods.inventory = e.target.value;
                                this.setState({ goods: goods })
                            }}>
                        </Input> 
                        <Radio.Group value={this.state.goods.onShelves}
                            onChange= {(e) => {
                                let goods = this.state.goods;
                                goods.onShelves = e.target.value;
                                this.setState({ goods: goods })
                            }}
                        >
                            <Radio value={true} defaultChecked={true}>上架</Radio>
                            <Radio value={false}>不上架</Radio>
                        </Radio.Group>
                        <Input  addonBefore="上架数量" style={{margin:"10px"}}
                            value={this.state.goods.remaining}
                            disabled={!this.state.goods.onShelves}
                            onChange= {(e) => {
                                let goods = this.state.goods;
                                goods.remaining = e.target.value;
                                this.setState({ goods: goods })
                            }}>
                        </Input>
                    </div>
                    </Modal>
                </div>
                <ul>{ GoodsList }</ul>
            </div>
        );
    }

    /* 商品列表 */
    GoodsItems(elem) {
        return <Card key={elem.key.toString()} style={{ margin: "20px", height: 330, width: 210, display: "inline-block", }}>
            <Link to={"/goods/" + elem.key}>
                <img alt="商品图片" src={elem.commodityCoverPicUrl} style={{ width: 200, height: 200, marginLeft: -20, marginTop: -20 }} />
            </Link>
            <div style={{ height: 140, width: 200, textAlign: "left", marginLeft: -20, }} className={elem.key.toString()}>

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

                <Button size="small" type="primary" style={{ position: "absolute", display: "block", marginTop: -10, bottom: 1, right: 1 }} onClick={this.handleClick}>
                    删除商品
                </Button>
            </div>
        </Card>;
    }
}

export default GoodsManage;