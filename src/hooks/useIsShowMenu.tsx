import { useLocation } from "react-router-dom";
import { routersData, type RouterKeys } from '../config';
import { useAppSelector } from '@/store';
import { select_menu, MenuData } from '../store/slice/user';


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
    const menu = memus.find((item: MenuData) => {
        return item.key === key
    }) as MenuData

    // debugger

    if(menu?.hasMenu) {
        return true
    } else {
        return false
    }
}

export default useIsShowMenu;