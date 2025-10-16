import { useState } from "react";
import { Tabs, TextInput, ScrollArea, Text } from "@mantine/core";
import "./UserManual.css";

//images
import navigate1 from "../../../public/UserManual/GettingStarted/navigate1.png"

//Components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";

export default function UserManual() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>("getting-started");

  const tabs = [
    {
      value: "getting-started",
      label: "Getting Started",
      content: (
        <>
          {" "}
          <h1> John User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Navigate through John</h3>
          <h4 className="stepTitle"> 1. Navigate the Side Navigation</h4>
          <p className="stepDescription">   - Scroll through the list of menu items to view all available sections. Each menu item corresponds to a page on the website.</p>
         <img src={navigate1} className="imgUser1" /> 
        <h4 className="stepTitle"> 2. Click on the section that you want to go to </h4>
          <p className="stepDescription">   - Example: Collection receipts</p>
                  <h4 className="stepTitle"> 2. Click on the section that you want to go to </h4>
          <p className="stepDescription">   - Example: Collection receipts</p>
        </>
      ),
    },
    {
      value: "invoices",
      label: "Invoices",
          content: (
        <>
          {" "}
          <h1> Invoice User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use invoice</h3>
        </>
      ),
    },
    {
      value: "collectionreceipts",
      label: "Collection Receipts",
          content: (
        <>
          {" "}
          <h1> Collection Receipts User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Collection Receipts</h3>
        </>
      ),
    },
    {
      value: "pettycash",
      label: "Petty Cash",
               content: (
        <>
          {" "}
          <h1> Petty Cash User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Petty Cash</h3>
        </>
      ),
    },
    {
      value: "bills",
      label: "Bills",
        content: (
        <>
          {" "}
          <h1> Bills User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Bills </h3>
        </>
      ),
    },
    {
      value: "billspayments",
      label: "Bills Payments",
        content: (
        <>
          {" "}
          <h1> Bills Payments User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Bills Payments</h3>
        </>
      ),
    },
    {
      value: "chequedisbursement",
      label: "Cheque Disbursement",
        content: (
        <>
          {" "}
          <h1> Cheque Disbursement User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Cheque Disbursement</h3>
        </>
      ),
    },
    {
      value: "deposits",
      label: "Deposits",
      content: (
        <>
          {" "}
          <h1> Deposits User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Deposits</h3>
        </>
      ),
    },
    {
      value: "transfers",
      label: "Transfers",
       content: (
        <>
          {" "}
          <h1> Transfers User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Transfers</h3>
        </>
      ),
    },
    {
      value: "withdrawals",
      label: "Withdrawals",
       content: (
        <>
          {" "}
          <h1> Withdrawals User Manual </h1>
          <h3 className="UserManualSubheading">Instruction on how to use Withdrawals</h3>
        </>
      ),
    },
  ];

  const filteredTabs = tabs.filter((tab) =>
    tab.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header title="User Manual" />
      <SideNavBar />
      <div className="userManualcontainer">
        <TextInput
          placeholder="Search user manual..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="userManualsearch"
        />

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          className="userManualtabs"
            orientation="vertical"
        >
          <Tabs.List grow className="userManualtablist">
            {filteredTabs.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                className="userManualtab"
              >
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          {filteredTabs.map((tab) => (
            <Tabs.Panel
              key={tab.value}
              value={tab.value}
              className="userManualpanel"
            >
              <ScrollArea className="userManualscroll">
                <Text className="userManualcontent">{tab.content}</Text>
              </ScrollArea>
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </>
  );
}
