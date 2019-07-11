import React from 'react';
import { Card, Button, Typography, Tooltip, message } from 'antd';
import goodsMock from '../../mock/goodsMock';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const { Paragraph } = Typography;

class GoodsManage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            goods: [],
            deleteing: false,
        }
    }
    
    
    
    componentDidMount() {
        this.setState({
            goods: goodsMock,
        })
    }


    handleClick = (e) => {
        const key = parseInt(e.target.parentNode.className);
        var goods = this.state.goods.filter((elem) => {
            return elem.key !== key;
        })
        this.setState({
            goods: goods,
        })
    }

    render() {

        const GoodsList = this.state.goods.map((elem) => (
            <Card key = { elem.key.toString() }
                style={{ margin: "20px", height: 330, width: 210, display: "inline-block", }}
            >
                <Link to={"/goods/"+elem.key}>
                <img alt="商品图片"
                    src={ elem.commodityCoverPicUrl } 
                    style={{width: 200, height: 200, marginLeft: -20, marginTop: -20}}
                />
                </Link>
                <div 
                    style={{height: 140, width: 200, textAlign: "left", marginLeft: -20,  }}
                    className = {elem.key.toString()}
                >
                    {/* 商品描述 */}
                    <Link to={"/goods/" + elem.key}>
                        <Paragraph ellipsis={true} >
                            <Tooltip title={elem.commodityInfo}>
                                <font style={{color: "blue"}}>
                                { elem.commodityInfo }
                                </font>
                            </Tooltip>
                        </Paragraph>
                    </Link>
                    {/* 商品价格 */}
                    <p style={{ margin: -2, marginTop: -10, marginLeft: 2}} >
                        <font style={{color: "orange", fontSize: 20}}>
                        { "￥" + elem.price }
                        </font>
                        
                    </p>
                    
                    {/* 是否上架 */}
                    <p style={{ margin: -2, marginLeft: 2}} >
                        { elem.onShelves ? "上架量:"+elem.remaining : "未上架" }
                    </p>
                    {/* 商品库存 */}
                    <p style={{ margin: -2, marginLeft: 2}} >
                        { "库存量:" + elem.inventory }
                    </p>
                    {/* 删除商品 */}
                    <Button size="small" 
                        style={{position: "absolute", display: "block", marginTop: -10, bottom: 1, right: 1}}
                        onClick={ this.handleClick }
                    >
                    删除商品
                    </Button>
                </div>
            </Card>
            )
        );

        return (
            <div >
                
                    <h2 style={{ textAlign: "center" }} >商品信息</h2>
                    <Button 
                        onClick = {()=>{message.info("增加商品")}}
                    >
                    增加商品
                    </Button>
                

                <ul>{ GoodsList }</ul>
            </div>
        );
    }
}

export default GoodsManage;