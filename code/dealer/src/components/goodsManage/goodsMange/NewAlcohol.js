import React from 'react';
import { Steps, Input, Radio, Button } from 'antd';
import { createHashHistory } from 'history';
import axios from 'axios';
import config from '../../../config/config';
import AlcoholClassInput from './newAlcohol/AlcoholClassInput';

const history = createHashHistory();

export default class NewAlcohol extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            goods: Object.assign({}, config.goods.originGoods),
        }
    }


    /**
     * @description 进入下一个进度
     */
    handleNextStep = () => {
        const step = this.state.step;
        if (step === 0) {
            this.setState({
                step: step + 1,
            })
        } else if (step === 1) {
            axios({
                method: "POST",
                url: config.url.goods,
                data: this.state.goods,
            })
            .then((res) => {
                console.log(res.data)
                history.push({
                    pathname: "/goodsManage/",
                })
            })
        }
    }

    /**
     * @description 返回上一个进度
     */
    handlePrevStep = () => {
        const step = this.state.step;
        if (step > 0) {
            this.setState({
                step: step - 1,
            })
        }
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
     * @description 绑定单选框的onChange
     * @param  { event } e
     * @param  { String } info
     */
    handleRadioChange = (e, info) => {
        let goods = this.state.goods;
        goods[info] = e.target.value;
        this.setState({
            goods: goods
        })
    }

    setAlcohol = (alcohol) => {
        let goods = this.state.goods;
        goods.price = alcohol.price;
        goods.commodityInfo = alcohol.alcoholInfo;
        goods.commodityCoverPicUrl = alcohol.coverPicUrl;
        goods.commodityClass = "酒";
    }

    render() {
        return (
            <div style={{ width: 800, height: 400, textAlign: "center" }}>
                {/* 新建商品进度条 */}
                <Steps current={this.state.step} >
                    <Steps.Step title="选择直销酒类"  />
                    <Steps.Step title="设置商品属性"  />
                </Steps>
                <div style={{position: "relative", left: "20%", textAlign:"center", marginTop: 50
                    , height: 250, width: 480, marginLeft: 150}}>
                {/* 选择酒商品 */}
                {
                    this.state.step === 0 &&
                    <AlcoholClassInput setAlcohol={ this.setAlcohol } />
                }
                {/* 商品信息输入 */}
                {
                    this.state.step === 1 &&
                    <div>
                        <Input.TextArea placeholder="商品信息描述" style={{margin:"10px"}}
                            value={this.state.goods.commodityInfo} 
                            onChange= {(e) => {this.handleChange(e, "commodityInfo")}}>
                        </Input.TextArea>
                        <Input type="number" min={0} step={0.1} addonBefore="商品价格￥" style={{margin:"10px"}}
                            defaultValue={0}
                            value={this.state.goods.price}
                            onChange= {(e) => {this.handleChange(e, "price")}}>
                        </Input>
                        <Input type="number" min={0} addonBefore="商品库存" style={{margin:"10px"}}
                            defaultValue={0}
                            value={this.state.goods.inventory}
                            onChange= {(e) => {this.handleChange(e, "inventory")}}>
                        </Input> 
                        <Radio.Group value={this.state.goods.onShelves}
                            onChange= {(e) => {this.handleChange(e, "onShelves")}}
                        >
                            <Radio value={true} defaultChecked={true}>上架</Radio>
                            <Radio value={false}>不上架</Radio>
                        </Radio.Group>
                        <Input type="number" min={0} addonBefore="上架数量" style={{margin:"10px"}}
                            defaultValue={0}
                            max={this.state.inventory ? this.state.inventory : 0} 
                            value={this.state.goods.remaining}
                            disabled={!this.state.goods.onShelves}
                            onChange= {(e) => {this.handleChange(e, "remaining")}}>
                        </Input>
                    </div>
                }
                </div>
                <Button style={{marginBottom: 10, marginLeft: 300, marginTop: 10, }}
                    onClick={this.handlePrevStep}
                >
                上一步
                </Button>
                <Button style={{marginBottom: 10, marginLeft: 150, marginTop: 10, }}
                    onClick={this.handleNextStep}
                >
                {this.state.step === 0 ? "下一步" : "确定"}
                </Button>      
            </div>
        );
    }
}