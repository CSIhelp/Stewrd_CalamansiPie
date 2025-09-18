import type { FC } from 'react';
import {useState, useEffect} from 'react';
import { IconChevronDown, IconLogout, IconUsers, IconPhone
 } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import UserMenu from '../UserMenu/UserMenu';
import './Header.modules.css';
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import averyLogo from "/averyLogo.jpg"

import { useSession } from '../../hooks/useSession';

interface HeaderProps {
  title: string; 
}


const Header: FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");
    const [adminCompany, setAdminCompany] = useState<string>("");
    const [clientId, setClientId] = useState<string>("");
      const { user, clearSession  } = useSession();

    const API_BASE = "https://johnbackend-hctabrmqd-csis-projects-620122e0.vercel.app/api/auth";

  const handleLogout = () => {
     clearSession();
   localStorage.clear();
    navigate ('/')   
    console.log('User logged out');
  };
   const handleOpenUserManage = () => {
    
    navigate ('/userManagement')
  };
  const handleContact = () => {
    navigate ('/contact')
  }

    
  return (
    <header className="Header">
   
      <div className="HeaderLogo">LOGO</div>

 
      <h1 className="HeaderTitle">{title}</h1>

     <Menu withArrow>
        <Menu.Target>
    
          <UserMenu
            image={averyLogo}
            company={user?.company || ""}
            clientId={user?.id || ""}
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
            color="blue"
            leftSection={<IconPhone size={16} />}
            onClick={handleContact}
            className='HeaderLogout'
          >
           Contact Us 
          </Menu.Item>  
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
