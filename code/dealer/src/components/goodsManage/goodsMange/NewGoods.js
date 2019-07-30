import React from 'react';
import { Steps, Input, Radio, Button, message } from 'antd';
import axios from 'axios';
import { createHashHistory } from 'history';
import config from '../../../config/config';
import GoodsImgUpload from './newGoods/GoodsImgUpload';
import SelectTag from './newGoods/SelectTag';

const { Step } = Steps;
const history = createHashHistory();

export default class NewGoods extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            goods: Object.assign({}, config.goods.originGoods),
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

    /**
     * @description 新增商品的触发事件
     */
     handleOk = (callback) => {
        let goods = this.state.goods;
        axios
            .post(config.url.goods, goods)
            .then(res => {
                goods.key = res.data.key;
                goods.commodityCoverPicUrl = res.data.coverPicUrl;
                const step = this.state.step;
                this.setState({
                    step: step + 1,
                    goods: goods,
                }, () => {
                    callback()
                })
            })
    }

    /**
     * @description 进入下一个进度
     */
    handleNextStep = () => {
        const step = this.state.step;
        if (step === 0) {
            if (this.allFilled()) {
                this.setState({
                    step: step + 1,
                })
            } else {
                message.warning("商品信息填写不完整")
            }
        } else if (step === 1) {
            if (this.classFilled()) {
                this.handleOk(() => {
                    message.success("添加成功")
                });
            } else {
                message.warning("商品类别未选择")
            }
        } else if (step === 2) {
            history.push({
                pathname: "/goodsManage/",
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
     * @description 检查下列属性是否填写完整
     */
    allFilled = () => {
        const goods = this.state.goods;
        let attrToBeChecked = ["commodityInfo", "price", "inventory", "onShelves"];
        for (let attr in attrToBeChecked) {
            if (goods[attr] === '' || goods[attr] === null) {
                return false;
            }
        }
        if (goods["onShelves"] && goods["remaining"] === null) {
            return false;
        }
        return true;
    }

    /**
     * @description 检查分类属性是否填写完整
     */
    classFilled = () => {
        const goods = this.state.goods;
        let attrToBeChecked = ["classId", "classInfo", ];
        for (let attr in attrToBeChecked) {
            if (goods[attr] === '' || goods[attr] === null) {
                return false;
            }
        }
        return true;
    }

    /**
     * @description 设定商品信息
     * @param  { int } commodityClassId
     * @param  { string } classInfo
     */
    setClass = (commodityClassId, classInfo) => {
        let goods = this.state.goods;
        goods.classId = commodityClassId;
        goods.classInfo = classInfo;
        this.setState({
            goods: goods,
        })
    }

    render() {
        return (
            <div style={{ width: 800, height: 400, marginLeft: 200, textAlign: "center" }}>
                {/* 新建商品进度条 */}
                <Steps current={this.state.step} >
                    <Step title="填写商品信息"  />
                    <Step title="选定商品类别"  />
                    <Step title="上传商品图片"  />
                </Steps>
                <div style={{position: "relative", left: "20%", textAlign:"center", marginTop: 50, height: 250, width: 480}}>
                {/* 商品信息输入 */}
                {
                    this.state.step === 0 &&
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
                {/* 选择商品标签 */}
                {
                    this.state.step === 1 &&
                    <SelectTag setClass={this.setClass} />
                }
                {/* 上传商品图片 */}
                {
                    this.state.step === 2 && 
                    <GoodsImgUpload goodsId={this.state.goods.key} imageUrl={this.state.goods.commodityCoverPicUrl} />
                }
                
                </div>
                <Button style={{margin: 10}}
                    onClick={this.handlePrevStep}
                >
                上一步
                </Button>
                <Button style={{margin: 10}}
                    onClick={this.handleNextStep}
                >
                {this.state.step === 0 ? "下一步" : "确定"}
                </Button>      
        </div>
        );
    }
}