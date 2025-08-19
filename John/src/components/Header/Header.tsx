import type { FC } from 'react';
import { IconChevronDown, IconLogout } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import UserMenu from '../UserMenu/UserMenu';
import './Header.modules.css';
import '@mantine/core/styles.css';

interface HeaderProps {
  title: string; // dynamic page title
}

const Header: FC<HeaderProps> = ({ title }) => {
  const handleLogout = () => {
    console.log('User logged out');
    // Logout logic here 
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
          <Menu.Item
            color="red"
            leftSection={<IconLogout size={16} />}
            onClick={handleLogout}
          >
            Log out
          </Menu.Item>   
        </Menu.Dropdown>
      </Menu>

    </header>
  );
};

export default Header;
