import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import style from './index.module.scss'
import login_desc from './assets/login_desc.png'
import login_logo from './assets/login_logo.png'
import login_title_cn from './assets/login_title_cn.png'
import login_title_en from './assets/login_title_en.png'
// import { RoleParams, set_user_info, UserInfoType } from '@/store/slice/user'
import { useDispatch } from 'react-redux'
import axios, { AxiosRes, ResData } from '@/util/http'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '../../store/index';
import { AxiosResData } from '../../util/http';
import { set_user_info } from '../../store/slice/user';
import { resolve } from 'path'
const COUNT = 60
const LoginPage: React.FC = () => {
	const [count, set_count] = useState(0)
	const [form] = Form.useForm()
	const [messageApi, contextHolder] = message.useMessage()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	// 开启倒计时
	useEffect(() => {
		setTimeout(() => {
			if (count === 0) return
			set_count(count - 1)
		}, 1000)
	}, [count])
	//发送验证码
	const startCode = () => {
		if (count !== 0) return
		form
			.validateFields(['phone'])
			.then(() => {
				set_count(COUNT)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	async function onLogin(value: any) {
		console.log('value', value)
		const res: AxiosResData<any> = await axios.post('/api/user/login', value)

		const user_info = res.data.data;

		dispatch(set_user_info(user_info))

		if(!user_info.has_person_info) {
			navigate('/person_info')
		} else {
			if(user_info.role === 'student') {
				navigate('/exam_select')
			}

			if(user_info.role === 'admin') {
				navigate('/corret_exam_list')
			}

			if(user_info.role === 'super_admin') {
				navigate('/corret_exam_list')
			}
		}
	}

	return (
		<div className={style.page_container}>
			{contextHolder}
			<div className={style.login_container}>
				<div className={style.login_left}>
					<div className={style.left_title}>
						<img src={login_desc} alt="" />
					</div>
				</div>
				<div className={style.login_right}>
					<div className={style.right_title}>
						<div>
							<img src={login_logo} alt="" />
						</div>
						<div className={style.title_container}>
							<div style={{fontSize:'40px',color:'gray',fontWeight:'bold'}}>
								业务员考试系统
								{/* <img src={login_title_cn} alt="" /> */}
							</div>
							<div>
								{/* <img src={login_title_en} alt="" /> */}
							</div>
						</div>
					</div>
					<div className={style.right_form}>
						<Form onFinish={onLogin} size="large" labelCol={{ span: 5 }} wrapperCol={{ span: 20 }}  labelAlign="left" onFinishFailed={onFinishFailed} form={form}>
							<Form.Item
								label="用户名"
								name="phone"
								rules={[
									{ required: true, message: '请填写手机号' },
									{ pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, 'g'), message: '请输入正确的手机号' },
								]}
							>
								<Input placeholder="请输入" />
							</Form.Item>
							<div style={{ position: 'relative' }}>
								<Form.Item label="验证码" name="code" rules={[{ required: true, message: '请输入验证码' }]}>
									<Input placeholder="请输入验证码" style={{ padding: '7px 100px 7px 11px' }} />
								</Form.Item>
								<div className={[style.form_code_btn, count !== 0 ? style.form_code_btn_disabled : ''].join(' ')} onClick={startCode}>
									{count === 0 ? '获取验证码' : `${count}秒`}
								</div>
							</div>
							<div className={style.form_btn}>
								<Button type="primary" htmlType="submit">
									登录
								</Button>
							</div>
						</Form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
