import ListTable from "./components/ListTable";
import {useAppSelector} from "@/store";
import Modal from './components/Modal'

function StudentManage() {
    // const modalVisible = useAppSelector(state => state.student_management.modalVisible)
    return (
        <>
            <ListTable/>
            <Modal />
        </>
    )
}

export default StudentManage