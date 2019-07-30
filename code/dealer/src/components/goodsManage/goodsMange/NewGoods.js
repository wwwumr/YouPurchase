import React from 'react';
import { Steps, Input, Radio, Button } from 'antd';
import config from '../../../config/config';

const { Step } = Steps;

export default class NewGoods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            goods: Object.assign({}, config.goods.originGoods),
        }
    }

    onChange = (step) => {
        console.log('onChange:', step);
        this.setState({ 
            step: step,
        });
    };

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

    handleNextStep = () => {
        const step = this.state.step;
        if (step < 3) {
            this.setState({
                step: step + 1,
            })
        }
    }

    render() {
        return (
            <div style={{ width: 800, height: 400, marginLeft: 200 }}>
                <Steps current={this.state.step} >
                    <Step title="填写商品信息"  />
                    <Step title="上传商品图片"  />
                    <Step title="选定商品类别"  />
                </Steps>
                {
                    this.state.step === 0 &&
                    <div style={{position: "relative", width: "60%", left: "20%", textAlign:"center", marginTop: 50,}}>
                        {/* 商品信息输入 */}
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
                        <Button onClick={this.handleNextStep}>确定</Button>
                    </div>
                }
        </div>
        );
    }
}