import styles from './index.module.css'
import { TreeSelect, Button } from 'antd';
import {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_subject_tree_async, select_subject_tree, set_subject_active_two, select_active_two, get_topic_two_list } from '../../store/slice/subject';
import { AppDispatch } from '../../store/index';
import RightContent from './rightContent';
import LeftContent from './leftContent';


function StudentAdd() {

    const dispath:AppDispatch = useDispatch()
    const treeData = useSelector(select_subject_tree)
	
    const active_two_obj: any = useSelector(select_active_two)

    useEffect( () => {
        dispath(get_subject_tree_async()).then((res) => {
            // console.log('res', res)
            const active_two_subject = res.payload[0].children[0]
            dispath(set_subject_active_two(active_two_subject))
        })
    }, [])

    useEffect(() => {
        dispath(get_topic_two_list(active_two_obj.value))
    }, [active_two_obj.value])

    const onChange = (newValue: string, nameArr: any) => {
        dispath(set_subject_active_two({
            title: nameArr[0],
            value: newValue
        }))
    };

    return (
        <div className={styles.wrap}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    {active_two_obj.title}
                </div>
                <div className={styles.top_right}>
                    <TreeSelect
                        style={{ width: '100%' }}
                        value={active_two_obj.value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={treeData}
                        placeholder="请选择课程类目"
                        treeDefaultExpandAll
                        onChange={onChange}
                    />
                </div>
                <Button type="primary" className={styles.add_button}>新增题目</Button>

            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <LeftContent />
                </div>
                <div className={styles.right}>
                    {/* <RightContent /> */}
                </div>
            </div>
        </div>
    )
}

export default StudentAdd