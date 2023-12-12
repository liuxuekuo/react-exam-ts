import { useEffect, useState } from "react";
import styles from "./exam.module.css";
import { Alert, Button, Divider, Input, Empty } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '@/store';
import { get_exam_async, select_exam_topic_list, set_current_exam_topic_id, select_current_exam_topic, set_exam_topic_list, set_exam_answer } from '../../store/slice/subject';
import axios from '@/util/http'
import { examPost } from '../../util/request';

function Exam() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [answer, set_answer] = useState('')
  const [can_submit, set_can_submit] = useState(false)
  const params: any = useParams()

  // 题目列表
  const topic_list: any[] = useAppSelector(select_exam_topic_list)
  // 当前选中的题目id
  const current_exam_topic: any = useAppSelector(select_current_exam_topic)

  useEffect(() => {
    let flag = false
    flag = topic_list.every((item) => {
      return item.answer
    })

    set_can_submit(flag)
  }, [topic_list])


  useEffect(() => {
    dispatch(get_exam_async(params.exam_id))
  }, [])

  function textarea_change(e: any) {
    set_answer(e.target.value)
  }

  function topic_click(item: any) {

    if (item._id !== current_exam_topic._id) {
      set_answer('')
    }

    dispatch(set_current_exam_topic_id(item._id))
  }

  function save_answer() {

    const text = answer.trim()
    if (!answer.trim()) {
      return
    }
    const _id = current_exam_topic._id;

    console.log('topic_list', topic_list)

    // 注意  一定要在reducer内部去修改数据
    // toolkit内部使用的immer数据结构
    dispatch(set_exam_answer({
      _id,
      answer: text
    }))
  }

  async function submit_click() {
    console.log('交卷')
    // await axios.post('/api/exam', {
    //   topic_list,
    //   two_id: params.exam_id
    // })

    await examPost({
      topic_list,
      two_id: params.exam_id
    })

    navigate('/exam_history')
  }

  return (
    <div className={styles.exam}>
      <div className={styles.exam_left}>
        <div className={styles.title}> 考题列表</div>
        <div className={styles.exam_left_content}></div>
        {topic_list.map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.questiontab}`}
              onClick={() => {
                topic_click(item)
              }}
            >
              <div
                className={`${styles.question} ${current_exam_topic._id === item._id ? styles.alreadyselect : ""
                  }`}
              >
                {index + 1}. {item.title}
              </div>
              <div
                className={`${styles.circle}  ${item.answer ? styles.alreadykeep : ""
                  }`}
              ></div>
            </div>
          );
        })}
      </div>

      <div className={styles.exam_right}>
        <div className={styles.exam_right_marigin}>
          <div className={styles.exam_right_top}>
            <div className={`${styles.title} ${styles.rightTitle} `}>
              题目详情
            </div>
          </div>
          <p className={styles.exam_right_question}>
            {`问题: ${current_exam_topic.title}`}
          </p>
          <p className={styles.exam_right_desc}>题目表述</p>
          <div className={styles.exam_right_pic}>
            {current_exam_topic.dec}
          </div>
        </div>

        <Divider />
        <div className={styles.exam_right_marigin}>
          <div className={`${styles.title}`}>作答区域</div>
          <Input.TextArea
            value={answer || current_exam_topic.answer}
            rows={4}
            placeholder="请作答"
            className={styles.customInput}
            onChange={textarea_change}
          />
          <div className={styles.exam_right_btn}>
            <Button
              type="primary"
              className={styles.keepbtn}
              onClick={save_answer}
            >
              保存作答
            </Button>
            <Button
              type="primary"
              className={styles.summitbtn}
              disabled={!can_submit}
              onClick={submit_click}
            >
              点击交卷
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exam;
