import React, { useEffect, useState } from 'react';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import usePathKey from '@/hooks/usePathKey';
import { useAppSelector } from '@/store/index';
import { select_menu } from '@/store/slice/user';

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
        const path = menus.find((item) => {
            return item.key === e.key
        })?.path as string

        Navigate(path)
        // Navigate(routersData[e.key as RouterKeys].path)
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menus} />;
};

export default App;