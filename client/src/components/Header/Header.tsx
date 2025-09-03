import type { FC } from 'react';
import { IconChevronDown, IconLogout, IconUsers
 } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import UserMenu from '../UserMenu/UserMenu';
import './Header.modules.css';
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';

interface HeaderProps {
  title: string; 
}


const Header: FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    console.log('User logged out');
   localStorage.clear();
    navigate ('/')
  };
   const handleOpenUserManage = () => {
    
    navigate ('/userManagement')
  };

  return (
    <header className="Header">
   
      <div className="HeaderLogo">LOGO</div>

 
      <h1 className="HeaderTitle">{title}</h1>

     <Menu withArrow>
        <Menu.Target>
    
          <UserMenu
            image="https://via.placeholder.com/150"

            name="Company Name"
            email="hspoonlicker@outlook.com"
         icon={<IconChevronDown size={16} />}
          />
        </Menu.Target>

        <Menu.Dropdown>
              { userRole =="admin" && (<Menu.Item
            color="blue"
            leftSection={<IconUsers size={16} />}
            onClick={handleOpenUserManage}
            className='HeaderLogout'
          >
           User Management
          </Menu.Item> )}
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
            className='HeaderLogout'
          >
            Log out
          </Menu.Item>   
     
        </Menu.Dropdown>
      </Menu>

    </header>
  );
};

export default Header;
