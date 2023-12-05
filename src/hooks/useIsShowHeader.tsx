
import { useLocation } from 'react-router-dom';

// 是否显示header
function useIsShowHeader() {
    const location = useLocation()
    if(location.pathname === '/login') {
        return false
    } else {
        return true
    }
}

export default useIsShowHeader