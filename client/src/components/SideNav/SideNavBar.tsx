import { useState, useEffect } from "react";
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
  IconCards,
  IconCashPlus,
  IconCashMinus,
  IconCashBanknoteMove,
  IconChevronUp,
  IconChevronDown,
} from "@tabler/icons-react";

import {
  Group,
  TextInput,
  Paper,
  Text,
  Container,
  Burger,
} from "@mantine/core";
import classes from "./SideNavBar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useSearch } from "../../SearchContext";
import { NewCardsData } from "../../data/AutomationCardData";

const SideBarLinks = [
  { link: "/invoice", label: "Invoices", icon: IconFileInvoice },
  {
    link: "/collectionreceipt",
    label: "Collection Receipts",
    icon: IconReceiptDollar,
  },
  { link: "/pettycash", label: "Petty Cash", icon: IconCash },
  { link: "/bills", label: "Bills", icon: IconInvoice },
  { link: "/payments", label: "Bills Payments", icon: IconCreditCardPay },
  {
    link: "/chequedisbursement",
    label: "Cheque Disbursement",
    icon: IconCards,
  },
  { link: "/deposit", label: "Deposits", icon: IconCashPlus },
  { link: "/transfer", label: "Transfers", icon: IconCashBanknoteMove },
  { link: "/withdraw", label: "Withdrawals", icon: IconCashMinus },
];

const reportLinks = [
  {
    link: "/bankreconciliation",
    label: "Bank Reconciliation",
    icon: IconBuildingBank,
  },
  { link: "/looseleaf", label: "Looseleaf", icon: IconCashRegister },
  { link: "/taxcompliance", label: "Tax Compliance", icon: IconClipboard },
  {
    link: "/financialreport",
    label: "Financial Reports",
    icon: IconBuildingBank,
  },
];

export function SideNavBar() {
  const [active, setActive] = useState("Dashboard");
  const { searchQuery, setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const [reportsOpen, setReportsOpen] = useState(false); // toggle for reports dropdown
  const userRole = localStorage.getItem("userRole");
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const links = SideBarLinks.map((item) => (
    <NavLink
      to={item.link}
      className={({ isActive }) =>
        isActive ? classes.activeLink : classes.link
      }
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className="linkIcon"stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  const reportNavLinks = reportLinks.map((item) => (
    <NavLink
      to={item.link}
      className={({ isActive }) =>
        isActive ? classes.subActiveLink : classes.subLink
      }
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.subLinkIcon} stroke={1.5} />
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
        opened={opened}
        onClick={() => setOpened(true)}
        size="sm"
        className={classes.mobileBurger}
      />
    );
  }

  return (
    <nav
      className={`${classes.navbar} ${isMobile ? classes.mobileNavbar : ""}`}
    >
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
                  if (card.buttonLink.startsWith("http")) {
                    window.open(card.buttonLink, "_blank");
                  } else {
                    navigate(card.buttonLink);
                  }
                  setSearchQuery("");
                }}
              >
                <Container className={classes.SearchItemContainer}>
                  <Group className={classes.SearchItemTXT}>
                    <Text fw={500} className={classes.SearchTitle}>
                      {card.title}{" "}
                    </Text>
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
            className={({ isActive }) =>
              isActive ? classes.activeLink : classes.link
            }
            onClick={() => setActive("Dashboard")}
          >
            <IconHome className="linkIcon" stroke={1.5} />
            <span>Dashboard</span>
          </NavLink>
        </Group>

        {links}

        <div>
          {userRole === "accountant" && (
            <>
              <div
                className={`${classes.link} ${
                  reportsOpen ? classes.activeLink : ""
                }`}
                onClick={() => setReportsOpen(!reportsOpen)}
                style={{ cursor: "pointer" }}
              >
                <IconClipboard className="linkIcon" stroke={1.5} />
                <span>Reports</span>
                {reportsOpen ? (
                  <IconChevronUp size={16} style={{ marginLeft: "auto" }} />
                ) : (
                  <IconChevronDown size={16} style={{ marginLeft: "auto" }} />
                )}
              </div>

              {reportsOpen && (
                <div className={classes.dropdownLinks}>
                  {reportLinks.map((item) => (
                    <NavLink
                      to={item.link}
                      key={item.label}
                      className={({ isActive }) =>
                        isActive ? classes.activeLink : classes.link
                      }
                      onClick={() => setActive(item.label)}
                      style={{ paddingLeft: "2.5rem" }}
                    >
                      <item.icon className="linkIcon"stroke={1.5} />
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
    
        <Group className={classes.documentation} justify="space-between">
                    <NavLink 
            to="/usermanual"
            className={({ isActive }) =>
              isActive ? classes.activeLink : classes.link
            }
            onClick={() => setActive("User Manual")}
          >
            <IconClipboard className={classes.linkIcon} stroke={1.5} />
            <span>User Manual</span>
          </NavLink>{" "}
      {userRole === "accountant" && (
            <>
              <NavLink
                to="/documentation"
                className={({ isActive }) =>
                  isActive ? classes.activeLink : classes.link
                }
                onClick={() => setActive("Documentation")}
              >
                <IconClipboard className="linkIcon"stroke={1.5} />
                <span>Documentation</span>
              </NavLink>{" "}</>
          )}

        </Group>            
      </div>
    </nav>
  );
}
