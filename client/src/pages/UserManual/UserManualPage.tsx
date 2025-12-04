import { useState } from "react";
import { Tabs, ScrollArea, Button } from "@mantine/core";
import { IconMenu2, IconX } from "@tabler/icons-react";
import manualContent from "../../data/manualContent";
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";
import { useNavigate } from "react-router-dom";
import "./UserManual.css";

export default function UserManualPage() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const firstTabId = manualContent[0]?.id || "";
  const [activeTab, setActiveTab] = useState(firstTabId);
 const navigate = useNavigate();
  const filteredTabs = manualContent.filter((section) =>
    section.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header title="User Manual" />
      <SideNavBar />

      <div className="UserManualcontainer">
        <input
          type="text"
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
          onChange={(value) => setActiveTab(value || firstTabId)}
          className="UserManualtabs"
          orientation="vertical"
        >
          {/* Mobile drawer */}
          <div className={`UserManualTabsWrapper ${menuOpen ? "open" : ""}`}>
            <Tabs.List className="UserManualtablist">
              {filteredTabs.map((tab) => (
                <Tabs.Tab
                  key={tab.id}
                  value={tab.id}
                  className="UserManualtab"
                  onClick={() => setMenuOpen(false)}
                >
                  {tab.title}
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </div>

{filteredTabs.map((tab) => (
  <Tabs.Panel key={tab.id} value={tab.id} className="UserManualpanel">
    <ScrollArea className="UserManualscroll">
      {/* Section title and description */}
      {tab.title && <h2 className="TabTitle">{tab.title}</h2>}
      {tab.description && <p className="TabDescription">{tab.description}</p>}

      {/* Requirements (if any) */}
      {tab.requirementDesc && tab.requirementDesc.length > 0 && (
        <div className="UserManualRequirments">
          <h3 className="UserManualHeading">{tab.requirement}</h3>
          <ul>
            {tab.requirementDesc.map((req, idx) => (
              <li key={idx}>
                {req.link ? (
                  <a
                    onClick={() => navigate(req.link)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {req.text}
                  </a>
                ) : (
                  req.text
                )}
              </li>
            ))}
          </ul>
        </div>
      )}



      {/* Steps */}
      {Array.isArray(tab.steps) && tab.steps.length > 0 ? (
        tab.steps.map((step, index) => (
          <div key={index} className="mb-6">
            {step.text && <h3 className="StepTitle">{step.text}</h3>}
            {step.description && (
              <p className="StepDescription">{step.description}</p>
            )}
            {step.image && (
              <img
                src={step.image}
                alt={step.text || `Step ${index + 1}`}
                className="imgUser1"
              />
            )}
          </div>
        ))
      ) : (
        "No steps available"
      )}
    </ScrollArea>
  </Tabs.Panel>
))}


        </Tabs>
      </div>
    </>
  );
}
