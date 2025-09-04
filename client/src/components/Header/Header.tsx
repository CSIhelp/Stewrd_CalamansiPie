import type { FC } from 'react';
import {useState, useEffect} from 'react';
import { IconChevronDown, IconLogout, IconUsers
 } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import UserMenu from '../UserMenu/UserMenu';
import './Header.modules.css';
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import averyLogo from "/averyLogo.jpg"

interface HeaderProps {
  title: string; 
}


const Header: FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");
    const [adminCompany, setAdminCompany] = useState<string>("");
    const [clientId, setClientId] = useState<string>("");

    const API_BASE = "https://johnbackend-99pzhbl2v-csis-projects-620122e0.vercel.app/api/auth";

  const handleLogout = () => {
    console.log('User logged out');
   localStorage.clear();
    navigate ('/')
  };
   const handleOpenUserManage = () => {
    
    navigate ('/userManagement')
  };
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_BASE}/Dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.user) {
          setAdminCompany(data.user.company);
           setClientId(data.user.id);
          
        }
      });
  }, []);

  return (
    <header className="Header">
   
      <div className="HeaderLogo">LOGO</div>

 
      <h1 className="HeaderTitle">{title}</h1>

     <Menu withArrow>
        <Menu.Target>
    
          <UserMenu
              image={averyLogo} 
            company={adminCompany}
             clientId={clientId} 
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
