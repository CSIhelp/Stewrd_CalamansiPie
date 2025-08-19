import { useState  } from 'react'
import {
  IconHome,
  IconFileInvoice,
  IconReceiptDollar,
  IconCash,
  IconInvoice,
  IconCreditCardPay,
  IconClipboard,
  IconLogout

} from '@tabler/icons-react';
import { Group } from '@mantine/core';
import classes from './SideNavBar.module.css';


const SideBarLinks = [
    
    {link: '', label: 'Invoices', icon: IconFileInvoice},
    {link: '', label: 'Collection Receipts', icon: IconReceiptDollar},
    {link: '', label: ' Petty Cash', icon: IconCash},
    {link: '', label: 'Bills', icon: IconInvoice},
    {link: '', label: 'Payments', icon: IconCreditCardPay},

]

export function SideNavBar() {
    const [active, setActive] = useState('Dashboard');
    const links = SideBarLinks.map((item) => (
            <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

    return (
        <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} >
              <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconHome className={classes.linkIcon} stroke={1.5} />
          <span>Dashboard</span>
        </a>
        </Group>
        {links}
        <Group className={classes.documentation} justify="space-between">
            <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconClipboard className={classes.linkIcon} stroke={1.5} />
          <span>Documentation</span>
        </a>
        </Group>
      </div>

      {/* <div className={classes.footer}>
     
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div> */}
    </nav>
  );
}