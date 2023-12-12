import { TreeSelect, Button, Tag } from 'antd'
import { ReactNode, useEffect, useMemo } from 'react'
import SubjectDetail from './components/TopicDetail'
import SubjectList from './components/TopicList'
import styles from './index.module.scss'
import './index.scss'
import {
	get_subject_tree_async,
	select_subject_tree,
	set_subject_active_two,
	select_active_two,
	get_topic_two_list,
	select_active_topic,
	set_subject_active_topic,
} from '@/store/slice/subject'
import { useAppDispatch, useAppSelector } from '@/store'
import { SubjectData } from '../../util/request';

// 禁用含有children字段的项
const disableHasChildrenItem = (items: SubjectData[]) => {
	const _items = JSON.parse(JSON.stringify(items))
	return _items.map((item: SubjectData) => {
		if (item.children?.length > 0) {
			// @ts-ignore
			item.disabled = true
			item.children = disableHasChildrenItem(item.children)
		}
		return item
	})
}

function SubjectAdd() {
	const dispatch = useAppDispatch()
	// 学科列表
	const lessonList = useAppSelector(select_subject_tree)
	console.log('SubjectAdd渲染')
	// 学科列表memo 使父级不能选择
	const lessonListMemo = lessonList.length ? disableHasChildrenItem(lessonList) : []
	// 当前学科
	const currentlesson = useAppSelector(select_active_two)
	// 当前选择题目
	const currentTopic = useAppSelector(select_active_topic)

	// 获取学科列表
	useEffect(() => {
		dispatch(get_subject_tree_async()).then((res: any) => {
			console.log('resss', res)
			dispatch(set_subject_active_two(res.payload?.[0]?.children?.[0] as SubjectData))
		})
	}, [])

	// 获取题目列表
	useEffect(() => {
		if (!currentlesson?.value) return
		dispatch(get_topic_two_list(currentlesson.value))
	}, [currentlesson?.value])




	// 选择学科
	const handleLessonChange = (value: string, labelList: ReactNode[]) => {
		dispatch(set_subject_active_topic(null))
		dispatch(
			set_subject_active_two({
				title: labelList[0],
				value: value,
			})
		)
	}
	// 新增题目
	const addTopic = () => dispatch(set_subject_active_topic(null))

	return (
		<div className={styles.wrap}>
			<div className="title-bar">
				<p className="title">{currentlesson?.title}</p>
				<div className="lesson-select">
					<TreeSelect popupClassName={'subject-add-tree-select'} style={{ width: 320 }} treeDefaultExpandAll treeData={lessonListMemo} value={currentlesson?.value} onChange={handleLessonChange} />
					<Button type="primary" onClick={addTopic}>
						新增题目
					</Button>
				</div>
			</div>

			<div className="content">
				<div className="left">
					<SubjectList />
				</div>
				<div className="right">
					<p className="title">题目详情{currentTopic ? <Tag color="orange">编辑</Tag> : <Tag color="blue">新增</Tag>}</p>
					<SubjectDetail />
				</div>
			</div>
		</div>
	)
}

export default SubjectAdd
