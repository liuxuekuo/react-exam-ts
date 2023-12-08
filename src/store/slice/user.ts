import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRes, ResData } from '@/util/http'
import { RootState } from '../index'
import { AxiosResData } from '../../util/http';


export type MenuData = {
    hasMenu: boolean,   // 是否显示菜单
    key: string,
    label: string,
    path: string
}

export type UserData = {
    name: string            // 学生花名
    vChat: string          // 微信名字
    phone: string          // 手机
    avatar: string        // 头像
    graduation_time: Date    // 毕业时间
    money: number         // 现在薪资
    role: string,        // 角色
    has_person_info: boolean,  // 是否填写个人信息
    edu: string,          // 学历
    techStack: string,    // 技术栈
    topic_role: [],
    _id: string
}

type Data = {
    menu: MenuData[],
    user_info: Partial<UserData>
}

const initialState: Data = {
    menu: [],
    user_info: {}
}

export const get_menu_async = createAsyncThunk<MenuData[]>(
    'get/user_menu',
    async (action, state) => {
        const res: AxiosResData<MenuData[]> = await axios.get('/api/user/menu')
        return res.data.data
    }
)


export const get_user_info = createAsyncThunk<UserData>(
    'get/user_info',
    async (action, state) => {
        const res: AxiosResData<UserData> = await axios.get('/api/user')
        return res.data.data
    })

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        set_memu: (state, aciton) => {
            state.menu = aciton.payload
        },
        set_user_info: (state, aciton) => {
            state.user_info = aciton.payload
            // return aciton.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_menu_async.fulfilled, (state, res) => {
                state.menu = res.payload
            })
            .addCase(get_user_info.fulfilled,(state, res) => {
                state.user_info = res.payload
            })
    }
})

export const select_menu = (state: RootState) => {
    return state.user.menu
}

export const select_user_info = (state: RootState) => {
    return state.user.user_info
}

export const { set_user_info } = userSlice.actions

export default userSlice.reducer