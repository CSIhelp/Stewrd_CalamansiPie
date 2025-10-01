import type { FC } from 'react';
import {useState, useEffect} from 'react';
import { IconChevronDown, IconLogout, IconUsers, IconPhone
 } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import UserMenu from '../UserMenu/UserMenu';
import './Header.modules.css';
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import { useSession } from '../../hooks/useSession';

//images
import CrowdSourceLogo from "/CrowdsourceLogo.png"
import CrowdSourceIcon from "/CrowdsourceIcon.png"


interface HeaderProps {
  title: string; 
}


const Header: FC<HeaderProps> = ({ title }) => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole");
    const [adminCompany, setAdminCompany] = useState<string>("");
    const [clientId, setClientId] = useState<string>("");
    const { user, clearSession, refreshSession } = useSession();
      


    const API_BASE = "https://johncis.vercel.app/api/auth";

const [loadingUser, setLoadingUser] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    try {
      await refreshSession();
    } finally {
      setLoadingUser(false);
    }
  };
  fetchUser();
}, [refreshSession]);


  
const handleLogout = async () => {
  try {
    const firebaseIdToken = localStorage.getItem("firebaseIdToken");
    if (firebaseIdToken) {
      await fetch(`${API_BASE}/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${firebaseIdToken}` },
      });
    }
  } catch (err) {
    // console.error("Logout failed", err);
  } finally {
    clearSession();       
    localStorage.clear();    
    navigate("/");           
  }
};
   const handleOpenUserManage = () => {
    
    navigate ('/userManagement')
  };
  const handleContact = () => {
    navigate ('/contact')
  }

    
  return (
    <header className="Header">
   
      <div className="HeaderLogo">
        <img src={CrowdSourceLogo} alt="Logo" className="LogoImage" />
      </div>

 
      <h1 className="HeaderTitle">{title}</h1>

     <Menu withArrow>
        <Menu.Target>
    
          <UserMenu
            image={ CrowdSourceIcon  }
            company={user?.company || "loading.."}
            clientId={user?.id || "loading.."}
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
