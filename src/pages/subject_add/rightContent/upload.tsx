import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

const { Dragger } = Upload;




function UploadCp(props: any) {

    const config = {
        name: 'file',
        // multiple: true,
        onChange(info : any) {
            const { status } = info.file;
            console.log('change', info);
            props.change(info)
        },
        onDrop(e: any) {
            console.log('Dropped files', e.dataTransfer.files);
            // window.file_list = e.dataTransfer.files;
        },
        customRequest(option: any) {
            const urlData = URL.createObjectURL(option.file); //转为blob格式（二进制文件）
            // console.log("blob:", urlData);
            option.onSuccess();
        },
        maxCount: 1,
        beforeUpload: () => {
            return false
        },
        multiple: true
    };

    return (
        <div>
            <Dragger {...config}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或者拖拽上传图片</p>
                <p className="ant-upload-hint">
                    请上传图片
                </p>
            </Dragger>
        </div>
    )
}

export default UploadCp;