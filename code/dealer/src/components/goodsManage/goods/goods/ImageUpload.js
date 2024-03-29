import React from 'react';
import { Upload, Icon, message, Tooltip  } from 'antd';
import axios from 'axios';
import config from '../../../../config/config';


function beforeUpload(file) {
    if (config.uploadImage.validFormat.indexOf(file.type) < 0) {
        message.error('上传的图片应为jpg或png格式!');
        return false;
    }

    if (file.size > config.uploadImage.maxCapicity) {
        message.error('图片大小不应超过2MB!');
        return false;
    }
    return true;
}

    
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: '',
            goodsId: null,
        };
    }

    componentDidMount() {
        let key = this.props.goodsId;
        axios   
            .get(config.url.goods + key)
            .then(res => {
                if (res.data !== null && res.data !== ''){
                    this.setState({
                        imageUrl: res.data.commodityCoverPicUrl,
                        goodsId: key,
                    })
                }
                
            })
    }
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
                this.setState({ loading: true });
                return;
            }
        if (info.file.status === 'done') {
            this.setState({
                imageUrl: info.file.response,
                loading: false,
            });
        }
    };
    
    render() {
        const uploadButton = (
        <div>
            <Icon type={this.state.loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
        );

        return (
        <Tooltip placement="topLeft" title="更换店面图片">
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action= {config.uploadImage.goodsAction}
                withCredentials={true}
                data={{"key": this.props.goodsId, "coverPicUrl": this.state.imageUrl}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{position: "relative",display: "block", width: "330px", height: "300px", 
                    verticalAlign: "center", textAlign: "center"}}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    <img src={ config.url.root + this.state.imageUrl} alt="商品图片" 
                        style={{position: "relative", width: "100%", height: "90%"}}
                    /> 
                    : uploadButton
                }
                <h3>点击更换图片</h3>
            </Upload>
        </Tooltip>
        );
    }
}

export default ImageUpload;