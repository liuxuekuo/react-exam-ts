import { useEffect, useState } from "react";
import styles from "./read_exam.module.css";
import { Alert, Button, Input, Empty } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@/store';
import { select_exam_topic_list, set_current_exam_topic_id, select_current_exam_topic, set_exam_topic_list, set_exam_answer, get_corret_exam_async, set_exam_corret } from '../../store/slice/subject';
import { Divider, Space, Tag } from 'antd';
import axios from '@/util/http';

function ReadExam() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()

    // 题目列表
    const topic_list: any[] = useAppSelector(select_exam_topic_list)

    useEffect(() => {
        const exam_id: any = params.exam_id
        dispatch(get_corret_exam_async(exam_id))
    }, [])

    return (
        <div>
            <div className={styles.exam}>
                <div className={styles.exam_left}>
                    <div className={styles.title}> 考题列表</div>
                    <div className={styles.exam_left_content}></div>
                    {topic_list.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={`${styles.questiontab}`}
                            >
                                <div
                                    className={`${styles.question}`}
                                >
                                    {index + 1}. {item.title}
                                </div>
                                {
                                    item.is_corret && item.pass ?
                                        (<div
                                            className={`${styles.circle} ${styles.alreadykeep}`}
                                        ></div>) : null
                                }
                                {
                                    item.is_corret && !item.pass ?
                                        (<div
                                            className={`${styles.wrong} ${styles.no_pass}`}
                                        ></div>) : null
                                }
                            </div>
                        );
                    })}
                </div>

                <div className={styles.exam_right}>
                    {
                        topic_list.map((item: any, index) => {
                            return (
                                <div className={styles.item_wrap}>
                                    <div className={styles.exam_right_marigin}>
                                        <div className={styles.exam_right_top}>
                                            <div className={`${styles.title} ${styles.rightTitle} `}>
                                                题目{index + 1}
                                            </div>
                                        </div>
                                        <p className={styles.exam_right_question}>
                                            {`问题: ${item.title}`}
                                            {
                                                item.pass ?
                                                    (
                                                        <Tag color="green">通过</Tag>
                                                    ) : (
                                                        <Tag color="red">不通过</Tag>
                                                    )
                                            }
                                        </p>
                                        <p className={styles.exam_right_desc}>题目表述：</p>
                                        <div className={styles.exam_right_pic}>
                                            {item.dec}
                                        </div>
                                        <div className={`${styles.title}`}>答案：</div>
                                        <div>
                                            {item.answer}
                                        </div>
                                    </div>
                                    <div className={styles.exam_right_marigin}>

                                        <div className={`${styles.title} ${styles.rightTitle} `}>
                                            批阅
                                        </div>
                                        <div>
                                            {item.comment}
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ReadExam