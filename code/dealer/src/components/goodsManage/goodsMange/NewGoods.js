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