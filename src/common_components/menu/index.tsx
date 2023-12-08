import React, { useEffect, useState } from 'react';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { superAdminMenus } from '@/config';
import { useNavigate } from 'react-router-dom';
import { routersData,type RouterKeys } from '../../config';
import usePathKey from '../../hooks/usePathKey';
import { useAppDispatch, useAppSelector } from '../../store/index';
import { get_menu_async, select_menu, MenuData } from '../../store/slice/user';

const App: React.FC = () => {
    const [current, setCurrent] = useState('');
    const Navigate = useNavigate()
    const menus = useAppSelector(select_menu)
    // 写死
    // const menus = superAdminMenus;
    const path_key = usePathKey()

    useEffect(() => {
        
        // setCurrent
        if(path_key) {
            setCurrent(path_key)
        }
    }, [])

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
        console.log('e.key', e.key)
        const path = menus.find((item: MenuData) => {
            return item.key === e.key
        })?.path as string

        Navigate(path)
        // Navigate(routersData[e.key as RouterKeys].path)
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menus} />;
};

export default App;