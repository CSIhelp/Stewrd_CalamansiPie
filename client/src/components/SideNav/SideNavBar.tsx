import { useState, useEffect } from 'react';
import {
  IconHome,
  IconFileInvoice,
  IconReceiptDollar,
  IconCash,
  IconInvoice,
  IconCreditCardPay,
  IconClipboard,
  IconSearch,
  IconArrowUpRight,
  IconBuildingBank,
  IconCashRegister,
  IconMenu
} from '@tabler/icons-react';
import { Group, TextInput, Paper, Text, Container, Burger  } from '@mantine/core';
import classes from './SideNavBar.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSearch } from '../../SearchContext';
import { NewCardsData } from '../../data/AutomationCardData';

const SideBarLinks = [
  { link: '/invoice', label: 'Invoices', icon: IconFileInvoice },
  { link: '/collectionreceipt', label: 'Collection Receipts', icon: IconReceiptDollar },
  { link: '/pettycash', label: 'Petty Cash', icon: IconCash },
  { link: '/bills', label: 'Bills', icon: IconInvoice },
  { link: '/payments', label: 'Payments', icon: IconCreditCardPay },
  {link: '/bankreconciliation' , label: "Bank Reconciliation", icon: IconBuildingBank },
  {link: '/looseleaf' , label: "Looseleaf", icon: IconCashRegister }
];

export function SideNavBar() {
  const [active, setActive] = useState('Dashboard');
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();

  // Mobile responsive 
  const [isMobile, setIsMobile] = useState(false);
  const [opened, setOpened] = useState(false); // toggle for mobile

// breakpoint
 useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 760); 
      if (window.innerWidth >= 760) setOpened(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const links = SideBarLinks.map((item) => (
    <NavLink
      to={item.link}
      className={({ isActive }) => (isActive ? classes.activeLink : classes.link)}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  // Filter cards by search query
  const filteredCards = NewCardsData.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isMobile && !opened) {
    return (
      <Burger
      opened = {opened}
      onClick={() => setOpened(true)}
        size="sm"
        className={classes.mobileBurger}
      />
    );
  }

  return (
    <nav className={`${classes.navbar} ${isMobile ? classes.mobileNavbar : ''}`}>
      <div className={classes.navbarMain}>



        {/* Search Input */}
        <TextInput
          placeholder="Search"
          leftSection={<IconSearch size={14} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          className={classes.search}
        />

        {/*  Dropdown Results */}
        {searchQuery && filteredCards.length > 0 && (
          <Paper shadow="md" radius="md" p="xs" className={classes.dropdown}>
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className={classes.dropdownItem}
                onClick={() => {
                  if (card.buttonLink.startsWith('http')) {
                    window.open(card.buttonLink, '_blank');
                  } else {
                    navigate(card.buttonLink);
                  }
                  setSearchQuery('');
                }}
              >
                <Container className={classes.SearchItemContainer}>
                  <Group className={classes.SearchItemTXT}>
                <Text fw={500} className={classes.SearchTitle}>{card.title}  </Text>
                <Text className={classes.SearchDescription}>
                  {card.description}
                </Text>
                </Group>
               <IconArrowUpRight size={25} /> 
                </Container>
              </div>
            ))}
          </Paper>
        )}

        <Group className={classes.header}>
  {/* Mobile close button */}
        {isMobile && (
          <Burger
            opened={opened}
            onClick={() => setOpened(false)}
            size="sm"
            className={classes.mobileCloseBurger}
          />
        )}
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? classes.activeLink : classes.link)}
            onClick={() => setActive('Dashboard')}
          >
            <IconHome className={classes.linkIcon} stroke={1.5} />
            <span>Dashboard</span>
          </NavLink>
        </Group>

        {links}

        <Group className={classes.documentation} justify="space-between">
          <NavLink
            to="/documentation"
            className={({ isActive }) => (isActive ? classes.activeLink : classes.link)}
            onClick={() => setActive('Documentation')}
          >
            <IconClipboard className={classes.linkIcon} stroke={1.5} />
            <span>Documentation</span>
          </NavLink>
        </Group>
      </div>
    </nav>
  );
}
