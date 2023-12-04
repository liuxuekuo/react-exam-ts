import { RouterKeys, routersData } from "@/config";
import { useLocation } from "react-router-dom";

const useIsShowMenu = () => {
    const location = useLocation();

    const key: RouterKeys = location.pathname.split("/")[1] as RouterKeys;
    if (!key) {
        return false;
    }

    if (routersData[key].hasMenu) {
        return true;
    }
    else {
        return false;
    }

}
export default useIsShowMenu;