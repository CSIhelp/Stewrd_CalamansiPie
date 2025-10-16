import { useState } from "react";
import { Tabs, TextInput, ScrollArea, Text, List, ListItem, Group } from "@mantine/core";
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
          <h4 className="StepTitle"> 1. Navigate the Side Navigation</h4>
          <p className="StepDescription">   - Scroll through the list of menu items to view all available sections. Each menu item corresponds to a page on the website.</p>
         <img src={navigate1} className="imgUser1" /> 
        <h4 className="StepTitle"> 2. Click on the section that you want to go to </h4>
          <p className="StepDescription">   - Example: Collection receipts</p>
                  <h4 className="StepTitle"> 2. Click on the section that you want to go to </h4>
          <p className="StepDescription">   - Example: Collection receipts</p>
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
          <h1> John Bills User Manual </h1>
          <h3 className="UserManualSubheading">Instruction onHow to create a Bill entry to the Main Database</h3>
         <Group className="UserManualRequirments">
          <h2 className="UserManualHeading"> Requirements </h2>
              <List>
      <List.Item>Form link for Bill and Petty Cash entries: Bill and Petty Cash Form</List.Item>
      <List.Item>Form link for registering Vendor and TIN: TIN and Vendor to QBO Form</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
    </List></Group>
        <h2 className="UserManualHeading"> Bill Tutorial </h2>
          <h4 className="StepTitle"> 1. Navigate the Side Navigation</h4>
          <p className="StepDescription">   - Scroll through the list of menu items.</p>
         <img src={navigate1} className="imgUser1" /> 
        <h4 className="StepTitle"> 2. Click on the Bills </h4>
          <p className="StepDescription">   - Example: Collection receipts</p>
                  <h4 className="StepTitle"> 2. Go to the Bill and Petty Cash Entry Form </h4>
          <p className="StepDescription">  - Enter your email address. This is where the receipt and documentation file will go.</p>
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
      <div className="UserManualcontainer">
        <TextInput
          placeholder="Search User manual..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="UserManualsearch"
        />

        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          className="UserManualtabs"
            orientation="vertical"
        >
          <Tabs.List grow className="UserManualtablist">
            {filteredTabs.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                className="UserManualtab"
              >
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

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
