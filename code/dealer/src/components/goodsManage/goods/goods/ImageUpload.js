import React from 'react';
import { Upload, Icon, message, Tooltip, Modal } from 'antd';
import shop from '../../../../config/shop';
import avatar from '../../../../config/avatar';
import url from '../../../../config/url';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    if (avatar.validFormat.indexOf(file.type) < 0) {
        message.error('上传的图片应为jpg或png格式!');
        return false;
    }

    if (file.size > avatar.maxCapicity) {
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
            imageUrl: shop.originShop.coverPicUrl,
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
        var coverPic = this.props.coverPic ? this.props.coverPic : shop.originShop.coverPicUrl;
        this.setState({
            imageUrl: coverPic,
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
        // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
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
                action= {avatar.action}
                data={{"key": this.props.storeId, "coverPicUrl": this.props.coverPic}}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
                style={{position: "relative",display: "block", width: "330px", height: "300px", 
                    verticalAlign: "center", textAlign: "center"}}
            >
                {/* action之后重构 */}
                {
                    this.state.imageUrl ?
                    <img src={this.state.imageUrl} alt="avatar" 
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