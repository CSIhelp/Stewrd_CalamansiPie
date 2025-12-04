import { useState } from "react";
import { Tabs, TextInput, ScrollArea, Text, Group, Button } from "@mantine/core";
import "./UserManual.css";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import AccountantBankReconciliation from "./UserManualTabs/AccountantBankReconciliation";
import Looseleaf from "./UserManualTabs/Looseleaf";
import SAWT from "./UserManualTabs/SAWT";
import SLSP from "./UserManualTabs/SLSP";
import FinancialReports from "./UserManualTabs/FinancialReports";
import QAP from "./UserManualTabs/QAP";
import AAP from "./UserManualTabs/AAP";
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
export default function UserManual() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>("AccountantBankReconciliation");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const tabs = [
    { value: "AccountantBankReconciliation", label: "Accountant Bank Reconciliation", content: <AccountantBankReconciliation /> },
    { value: "looseleaf", label: "Looseleaf", content: <Looseleaf /> },
 { value: "SummaryAlphalistofWithholdingTaxatSourceSAWT", label: "SAWT", content: <SAWT /> },
   { value: "SalesandPurchases(SLSP)", label: "SLSP", content: <SLSP /> },
   { value: "FinancialReports", label: "Financial Reports", content: <FinancialReports /> },
   { value: "QuarterlyAlphalistofPayees", label: "Quarterly Alphalist of Payees (QAP", content: <QAP /> },
  { value: "AnnualAlphalistofPayees", label: "Annual Alphalist of Payees (AAP)", content: <AAP /> },
 ];

  const filteredTabs = tabs.filter((tab) =>
    tab.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header title="User Manual" />
      <SideNavBar />
      <div className="UserManualcontainer">
        <TextInput
          placeholder="Search User manual..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="UserManualsearch"
        />
        <Button
          className="UserManualBurger"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </Button>

        <div
          className={`UserManualOverlay ${menuOpen ? "show" : ""}`}
          onClick={() => setMenuOpen(false)}
        ></div>

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          className="UserManualtabs"
          orientation="vertical"
        >
          <div className={`UserManualTabsWrapper ${menuOpen ? "open" : ""}`}>
            <Tabs.List className="UserManualtablist">
              {filteredTabs.map((tab) => (
                <Tabs.Tab
                  key={tab.value}
                  value={tab.value}
                  className="UserManualtab"
                  onClick={() => setMenuOpen(false)}
                >
                  {tab.label}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </div>

          {filteredTabs.map((tab) => (
            <Tabs.Panel
              key={tab.value}
              value={tab.value}
              className="UserManualpanel"
            >
              <ScrollArea className="UserManualscroll">
                <Text className="UserManualcontent">{tab.content}</Text>
              </ScrollArea>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </>
  );
}