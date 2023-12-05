import { Outlet } from "react-router-dom";
import Header from './header';
import Menu from './menu';
import useIsShowMenu from '../hooks/useIsShowMenu';
import useIsShowHeader from '../hooks/useIsShowHeader';
// Layout专门专注壳子
function Layout() {

    const is_show_menu = useIsShowMenu()
    const is_show_header = useIsShowHeader()
    return (
        <div className="layout">
            {
                is_show_header ? (
                    <div className="header_wrap">
                        <Header />
                    </div>
                ) : null
            }


            {
                is_show_menu ? (
                    <div className="nav_wrap">
                        <Menu />
                    </div>
                ) : null
            }

            <div className="outlet_wrap">
                <Outlet />
            </div>
        </div>
    )
}

export default Layout;