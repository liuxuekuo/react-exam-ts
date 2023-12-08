import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios, { AxiosRes, ResData } from '@/util/http'
import { RootState } from '../index'

// 单个课程类型 1.2.3.4。。。
export type LessonType = {
	title: string
	value: string   // 课程分类id
	children: LessonType[]
}

// 单个题目类型
export type TopicType = {
	dec: string
	title: string
	two_id: string
	_id: string
	img: string[]
}

// 题库仓库state类型
type SubjectState = {
	loading: boolean
	// 课程树形数据
	subject_tree: LessonType[]
	// 当前选择课程
	active_two: LessonType | null
	// 题目列表
	topic_two_list: TopicType[]
	// 当前选择题目
	active_topic: TopicType | null,
}

const initialState = {
	loading: false,
	subject_tree: [],
	active_two: null,
	topic_two_list: [],
	active_topic: null,
} as SubjectState

export const get_subject_tree_async = createAsyncThunk<LessonType[], void>('get/subject_tree', async (action, state) => {
	const res: AxiosRes<ResData<LessonType[]>> = await axios.get('/api/subject')
	return res.data.data
})

export const get_topic_two_list = createAsyncThunk<TopicType[], string>('get/topic_two_list', async (action, state) => {
	const res: AxiosRes<ResData<TopicType[]>> = await axios.get(`/api/topic/${action}`)
	return res.data.data
})

export const subjectSlice = createSlice({
	name: 'subject',
	initialState,
	reducers: {
		set_subject_active_two: (state, action) => {
			state.active_two = action.payload
		},
		set_subject_active_topic: (state, action) => {
			state.active_topic = action.payload
		},

	},
	extraReducers: (builder) => {
		builder
			// 获取课程列表fulfilled
			.addCase(get_subject_tree_async.fulfilled, (state, res) => {
				state.subject_tree = res.payload
				// state.active_two = (res.payload?.[0]?.children?.[0] as LessonType) || null
			})
			// 获取题目列表pending
			.addCase(get_topic_two_list.pending, (state) => {
				console.log('pending')
				state.loading = true
			})
			// 获取题目列表fulfilled
			.addCase(get_topic_two_list.fulfilled, (state, res) => {
				console.log('fulfilled')
				state.topic_two_list = res.payload
				state.loading = false
			})
	},
})

// 获取loading状态
export const select_subject_loading = (state: RootState) => {
	return state.subject.loading
}

// 获取课程树形数据
export const select_subject_tree = (state: RootState) => {
	return state.subject.subject_tree
}

// 获取当前选择课程
export const select_active_two = (state: RootState) => {
	return state.subject.active_two
}

// 获取题目列表
export const select_topic_two_list = (state: RootState) => {
	return state.subject.topic_two_list
}

// 获取当前选择题目
export const select_active_topic = (state: RootState) => {
	return state.subject.active_topic
}


export const { set_subject_active_two, set_subject_active_topic } = subjectSlice.actions

export default subjectSlice.reducer
