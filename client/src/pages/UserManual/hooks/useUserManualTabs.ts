import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useUserManualTabs = () => {
  const [activeTab, setActiveTab] = useState<string | null>("getting-started");
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");

  const tabs = [
    ...(userRole === "accountant"
      ? [
          {
            value: "AccountantBankReconciliation",
            label: "Accountant Bank Reconciliation",
            component: "AccountantBankReconciliation",
          },
          {
            value: "looseleaf",
            label: "Looseleaf",
            component: "Looseleaf",
          },
          {
            value: "SummaryAlphalistofWithholdingTaxatSourceSAWT",
            label: "Summary Alphalist of Withholding Tax at Source",
            component: "SAWT",
          },
          {
            value: "SalesandPurchases(SLSP)",
            label: "Sales and Purchases (SLSP)",
            component: "SLSP",
          },
          {
            value: "FinancialReports",
            label: "Financial Reports",
            component: "FinancialReports",
          },
          {
            value: "QuarterlyAlphalistofPayees",
            label: "Quarterly Alphalist of Payees",
            component: "QAP",
          },
          {
            value: "AnnualAlphalistofPayees",
            label: "Annual Alphalist of Payees",
            component: "AAP",
          },
        ]
      : []),
  ];

  return {
    activeTab,
    setActiveTab,
    tabs,
  };
};

export default useUserManualTabs;