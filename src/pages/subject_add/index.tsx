import { TreeSelect } from 'antd'
import { useDispatch } from 'react-redux'
import styles from './index.module.css'
import { AppDispatch } from '@/store'
import { useEffect } from 'react'
import { get_subject_tree_async } from '@/store/slice/subject'

function StudentAdd() {

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(get_subject_tree_async())
    }, [])

    return (
        <div className={styles.wrap}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                </div>
                <div className={styles.top_right}>
                    <TreeSelect

                    />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className=''></div>
                </div>
                <div className={styles.right}>

                </div>
            </div>
        </div>
    )
}

export default StudentAdd