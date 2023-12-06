import { Form, Input, Button } from 'antd';
import styles from './index.module.css'
import Upload from './upload'
import {useEffect,useRef} from 'react';
import { upload_imgs } from '../../../util/index';
import axios from '@/util/https'
import { useSelector, useDispatch } from 'react-redux';
import { select_active_two, get_topic_two_list } from '../../../store/slice/subject';

const { TextArea } = Input;

function RightContent() {
    const two_obj: any = useSelector(select_active_two)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    let active_file: any = useRef({})

    function file_change(file_info: any) {
        console.log('file_info', file_info)
        active_file.current = file_info
    }

    async function submit_click() {
        const form_data = await form.validateFields()

        if(form_data) {
            console.log('form_data img', form_data)

            if(active_file.current?.fileList?.length) {
                const imgs_url_arr = await upload_imgs(active_file.current.fileList)
                form_data.img = imgs_url_arr
            }
            form_data.two_id = two_obj.value

            // 提交数据
            await axios.post('/api/topic', form_data)
            dispatch(get_topic_two_list(two_obj.value))
            form.resetFields()
            
        }
    }

    return (
        <Form
            name="basic"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 16 }}
            // style={{ width: 800 }}
            initialValues={{
            }}
            autoComplete="off"
            form={form}
        >
            <Form.Item
                label="标题"
                name="title"
                rules={[{ required: true, message: '请输入' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="描述"
                name="dec"
                rules={[{ required: true, message: '请输入' }]}
            >
                <TextArea />
            </Form.Item>
            
            <Upload change={file_change} />
            <Button onClick={submit_click} danger type="primary"  className={styles.add_button}>保存</Button>
        </Form>
    )
}

export default RightContent;