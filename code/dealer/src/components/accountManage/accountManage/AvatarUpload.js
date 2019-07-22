import React from 'react';
import { Upload, Icon, message, Tooltip } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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


class AvatarUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dealerId: null, 
            imageUrl: '',
        };
        
    }

    componentDidMount() {
        axios   
            .get(config.url.dealer)
            .then(res => {
                if (res.data !== null && res.data !== ''){
                    this.setState({
                        imageUrl: config.url.root + res.data.avatar,
                        dealerId: res.data.key,
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
        // Get this url from response in real world.
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
        <Tooltip placement="topLeft" title="更换头像">
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action= {config.uploadImage.avatarAction}
                data={{"avatar": this.state.imageUrl, "key": this.state.dealerId}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{position: "relative",display: "block", width: "125px", height: "125px", 
                    verticalAlign: "center", textAlign: "center"}}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    (
                    <div
                        style={{position: "relative", width: "115px", height: "115px", marginLeft: "-2px", marginTop: "-2px"}}
                    >
                    <img src={ config.url.root + this.state.imageUrl} alt="头像" 
                        style={{position: "relative", width: "100%", height: "100%"}} 
                    /> 
                    </div>
                    )
                    : uploadButton
                }
                
            </Upload>
        </Tooltip>
        );
    }
}

export default AvatarUpload;