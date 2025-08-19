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
import { NavLink } from 'react-router-dom';


const SideBarLinks = [
    
    {link: '/invoice', label: 'Invoices', icon: IconFileInvoice},
    {link: '', label: 'Collection Receipts', icon: IconReceiptDollar},
    {link: '', label: ' Petty Cash', icon: IconCash},
    {link: '', label: 'Bills', icon: IconInvoice},
    {link: '', label: 'Payments', icon: IconCreditCardPay},

]

export function SideNavBar() {
    const [active, setActive] = useState('Dashboard');
    const links = SideBarLinks.map((item) => (
            <NavLink
                 to={item.link}
      className={classes.link}
      key={item.label}
      onClick={() => setActive(item.label)}

    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

    return (
        <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} >
              <NavLink to="/" className={classes.link} onClick={() => setActive("Dashboard")}>
          <IconHome className={classes.linkIcon} stroke={1.5} />
          <span>Dashboard</span>
        </NavLink>
        </Group>
        {links}
        <Group className={classes.documentation} justify="space-between">
            <NavLink to="/Documentation" className={classes.link} onClick={(event) => event.preventDefault()}>
            <IconClipboard className={classes.linkIcon} stroke={1.5} />
          <span>Documentation</span>
        </NavLink>
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