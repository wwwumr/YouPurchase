import React from 'react';
import { Upload, Icon, message, Tooltip, Typography } from 'antd';
import axios from 'axios';
import config from '../../../config/config';

const { Title } = Typography;


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

/* props 含有coverPic={this.state.shop.coverPicUrl} storeId={this.state.shop.key} */
export default class StoreImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: '',
            storeId: null,
        };
    }

    componentWillMount() {
        axios   
            .get(config.url.store)
            .then(res => {
                if (res.data !== null && res.data !== ''){
                    this.setState({
                        imageUrl: res.data.coverPicUrl,
                        storeId: res.data.key,
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
            })
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
        <div style={{ marginLeft: 100, }}>
        <Title level={3} >点击更换店面图片</Title>
        <Tooltip placement="topLeft" title="更换店面图片">
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action= {config.uploadImage.storeAction}
                withCredentials={true}
                data={{"key": this.state.storeId, "coverPicUrl": this.state.coverPic}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{position: "relative",display: "block", width: "480px", height: "320px",
                    verticalAlign: "center", textAlign: "center"}}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    <img src={config.url.root + this.state.imageUrl} alt="店面" 
                        style={{position: "relative", width: "100%", height: "100%"}}
                    /> 
                    : uploadButton
                }
            </Upload>
        </Tooltip>
        </div>
        );
    }
}
