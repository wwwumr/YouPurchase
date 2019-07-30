import React from 'react';
import { Upload, Icon, message, } from 'antd';
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


export default class GoodsImgUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dealerId: null, 
            imageUrl: this.props.imageUrl,
        };
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
        <div style={{position: "relative", left: "20%", textAlign:"center", marginTop: 50, height: 250, width: 480}}>
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action= {config.uploadImage.goodsAction}
                withCredentials={true}
                data={{"coverPicUrl": this.state.imageUrl, "key": this.props.goodsId}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{position: "relative",display: "block", width: "250px", height: "250px", 
                    verticalAlign: "center", textAlign: "center", }}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    (
                    <div
                        style={{position: "relative", width: "240px", height: "240px", marginLeft: "-3px", marginTop: "-2px"}}
                    >
                    <img src={ config.url.root + this.state.imageUrl} alt="头像" 
                        style={{position: "relative", width: "100%", height: "100%"}} 
                    /> 
                    </div>
                    )
                    : uploadButton
                }
            </Upload>
        </div>
        );
    }
}
