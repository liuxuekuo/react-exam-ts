import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/util/https';
import { AxiosRes } from '@/util/https'
import { RootState } from '../index';

const initialState = {
    subject_tree: [],//课程信息
    active_two: {}//二级分类结构
}

//创建请求
export const get_subject_tree_async = createAsyncThunk(
    'get/subject_tree',
    async (action, state) => {
        const res: AxiosRes = await axios.get('/api/subject')
        console.log(res, 'res');
        return res.data.data
    }
)

export const subjectSlice = createSlice({
    name: "subject",
    initialState,
    reducers: {

    },

    // extraReducers: (builder) => {
    //     builder
    // }
})
export default subjectSlice.reducer

