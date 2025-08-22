import { forwardRef } from 'react';

import { Group, Avatar, Text, UnstyledButton } from '@mantine/core';
import './UserMenu.css';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserMenu = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...props }: UserButtonProps, ref) => (
    <UnstyledButton ref={ref} {...props} className="UserButton" >
      <Group className="UserMenu">
        <Avatar className='ProfilePhoto' src={image} />
        <div className="UserInfo">
          <Text>
            {name}
          </Text>
      
        </div>
 {icon}
 
      </Group>
    </UnstyledButton>
  )
);

UserMenu.displayName = 'UserMenu';
export default UserMenu;
