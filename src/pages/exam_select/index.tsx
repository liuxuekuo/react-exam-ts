import styles from "./index.module.scss";
import { useEffect, useRef } from "react";
import React from "react";
import classnames from "classnames";

import {
  get_subject_tree_async, set_current_two_subject,
} from "@/store/slice/subject";
import colorsData from "./color.json";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/index";
import { useNavigate } from "react-router-dom";
import { select_subject_tree, select_current_two_subject } from '../../store/slice/subject';
import { useAppSelector } from '@/store';

function ExamSelect() {
  const data = useAppSelector(select_subject_tree)

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const current_two_subject = useAppSelector(select_current_two_subject)

  useEffect(() => {
    dispatch(get_subject_tree_async());
  }, []);

  const handleJump = () => {
    if (!current_two_subject) {
      alert("请选择题目再作答");
    } else {
      navigate({
        pathname: `/exam/${current_two_subject}`,
      });
    }
  };

  function item_click(item: any) {
    if(!item.can_exam) {
      return
    }

    dispatch(set_current_two_subject(item.value))
  }

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div>
            {data.map((item, index) => (
              <React.Fragment key={item.title}>
                <div
                  style={{
                    color:
                      colorsData.colors[index % colorsData.colors.length].value,
                  }}
                  className={styles.title}
                >
                  {/* <img src={item.img} alt=""></img> */}
                  <div>{item.title}</div>
                </div>
                <div className={styles.topic_section}>
                  {item.children.map(
                    (_item) => (
                      <div
                        key={_item.value}

                        onClick={() => {
                          item_click(_item)
                        }}

                        className={classnames(styles.topic_section_content, {
                          topic_section_content_selected:
                            _item.value === current_two_subject,
                          topic_section_content_disabled:
                            _item.can_exam === false,
                        })}
                      >
                        <p>{_item.title}</p>
                      </div>
                    )
                  )}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <button onClick={handleJump}>开始答题</button>
        </div>
      </div>
    </>
  );
}

export default ExamSelect;
