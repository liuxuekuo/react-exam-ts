import { Outlet } from "react-router-dom";
import Header from './header';
import Menus from './menu';
import useIsShowMenu from "../hooks/useIsShowMenu";
function Layout() {
    const isShowMenu = useIsShowMenu()
    return (
        <div className="layout">
            <div className="header_wrap">
                <Header />
            </div>
            {
                isShowMenu ? (
                    <div className="nav_wrap">
                        <Menus />
                    </div>
                ) : null
            }
            <div className="outlet_wrap">
                <Outlet /> {/* 占位 */}
            </div>
        </div>
    )
}

export default Layout;