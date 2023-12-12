import { useLocation } from "react-router-dom";
import { type RouterKeys } from '../config';
import { useAppSelector } from '@/store';
import { select_menu } from '@/store/slice/user';


function useIsShowMenu() {
    const location = useLocation()
    const memus = useAppSelector(select_menu)
    console.log('location' ,location)

    const key:RouterKeys = location.pathname.split('/')[1] as RouterKeys
    // debugger
    if(!key || !memus.length) {
        return false
    }
    // debugger
    const menu = memus.find((item) => {
        return item.key === key
    })

    // debugger

    if(menu?.hasMenu) {
        return true
    } else {
        return false
    }
}

export default useIsShowMenu;