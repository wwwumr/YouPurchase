import React from 'react';
import { Upload, Icon, message, Tooltip, Modal } from 'antd';
import axios from 'axios';
import config from '../../../../config/config';


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

    
class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imageUrl: '',
            goodsId: null,
            previewVisible: false,
            previewImage: '',
            fileList: [
                {
                    uid: '-1',
                    name: 'xxx.png',
                    status: 'done',
                    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                },
            ],
        };
    }

    componentWillMount() {
        let key = this.props.goodsId;
        axios   
            .get(config.url.goods + key)
            .then(res => {
                if (res.data !== null && res.data !== ''){
                    this.setState({
                        imageUrl: res.data.commodityCoverPicUrl,
                        goodsId: res.data.key,
                    })
                }
                
            })
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
        });
    };
    
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

        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton1 = (
        <div>
            <Icon type="plus" />
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
                    <img src={ config.url.root + this.state.imageUrl} alt="头像" 
                        style={{position: "relative", width: "100%", height: "90%"}}
                    /> 
                    : uploadButton
                }
                <h3>点击更换图片</h3>
            </Upload>
            <div className="clearfix">
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={ this.handlePreview }
                    onChange={ ({ fileList }) => this.setState({ fileList }) }
                    style={{position: "relative",display: "block", width: "100px", height: "100px", 
                        verticalAlign: "center", textAlign: "center"}}
                >
                {fileList.length >= 3 ? null : uploadButton1}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" 
                        style={{position: "relative", width: "100%", height: "100%"}} 
                        src={previewImage} 
                    />
                </Modal>
            </div>
        </Tooltip>
        );
    }
}

export default ImageUpload;