import { useState } from "react";
import {
  Tabs,
  TextInput,
  ScrollArea,
  Text,
  List,
  ListItem,
  Group,
  Button,
  Table,
  Center
} from "@mantine/core";
import "./UserManual.css";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

//images
import navigate1 from "../../../public/UserManual/GettingStarted/navigate1.png";
import BillStep1 from "../../../public/UserManual/Bills/step1.png";
import BillStep2 from "../../../public/UserManual/Bills/step2.png";
import BillStep3 from "../../../public/UserManual/Bills/step3.png";
import BillStep4 from "../../../public/UserManual/Bills/step4.png";
import BillStep5 from "../../../public/UserManual/Bills/step5.png";
import PettyStep1 from "../../../public/UserManual/PettyCash/step1.png";
import PettyStep2 from "../../../public/UserManual/PettyCash/step2.png";
import PettyStep3 from "../../../public/UserManual/PettyCash/step3.png";
import PettyStep4 from "../../../public/UserManual/PettyCash/step4.png";
import PettyStep5 from "../../../public/UserManual/PettyCash/step5.png";
import InvoiceStep1 from "../../../public/UserManual/Invoice/step1.png";
import InvoiceStep2 from "../../../public/UserManual/Invoice/step2.png";
import InvoiceStep3 from "../../../public/UserManual/Invoice/step3.png";
import InvoiceStep4 from "../../../public/UserManual/Invoice/step4.png";
import InvoiceStep5 from "../../../public/UserManual/Invoice/step5.png";
import ChequeStep1 from "../../../public/UserManual/ChequeDisbersment/step1.png";
import ChequeStep2 from "../../../public/UserManual/ChequeDisbersment/step2.png";
import ChequeStep3 from "../../../public/UserManual/ChequeDisbersment/step3.png";
import ChequeStep4 from "../../../public/UserManual/ChequeDisbersment/step4.png";
import DepositStep1 from "../../../public/UserManual/Deposit/step1.png";
import DepositStep2 from "../../../public/UserManual/Deposit/step2.png";
import DepositStep3 from "../../../public/UserManual/Deposit/step3.png";
import DepositStep4 from "../../../public/UserManual/Deposit/step4.png";
import WithdrawStep1 from "../../../public/UserManual/Withdraw/step1.png";
import WithdrawStep2 from "../../../public/UserManual/Withdraw/step2.png";
import WithdrawStep3 from "../../../public/UserManual/Withdraw/step3.png";
import WithdrawStep4 from "../../../public/UserManual/Withdraw/step4.png";
import TransferStep1 from "../../../public/UserManual/Transfer/step1.png";
import TransferStep2 from "../../../public/UserManual/Transfer/step2.png";
import TransferStep3 from "../../../public/UserManual/Transfer/step3.png";
import TransferStep4 from "../../../public/UserManual/Transfer/step4.png";
import PaymentStep1 from "../../../public/UserManual/Payment/step1.png";
import PaymentStep2 from "../../../public/UserManual/Payment/step2.png";
import PaymentStep3 from "../../../public/UserManual/Payment/step3.png";
import PaymentStep4 from "../../../public/UserManual/Payment/step4.png";
import PaymentStep5 from "../../../public/UserManual/Payment/step5.png";
import CollectionStep1 from "../../../public/UserManual/Collection/step1.png";
import CollectionStep2 from "../../../public/UserManual/Collection/step2.png";
import CollectionStep3 from "../../../public/UserManual/Collection/step3.png";
import CollectionStep4 from "../../../public/UserManual/Collection/step4.png";
import CollectionStep5 from "../../../public/UserManual/Collection/step5.png";
import BankReconciliationStep1 from "../../../public/UserManual/BankReconciliation/Step 1.png";
import BankReconciliationStep2 from "../../../public/UserManual/BankReconciliation/Step 2.png";
import BankReconciliationStep3 from "../../../public/UserManual/BankReconciliation/Step 3.png";
import BankReconciliationStep4 from "../../../public/UserManual/BankReconciliation/Step 4.png";
import BankReconciliationStep5 from "../../../public/UserManual/BankReconciliation/Step 5.png";
import BankReconciliationStep6 from "../../../public/UserManual/BankReconciliation/Step 6.png";
import BankReconciliationStep7 from "../../../public/UserManual/BankReconciliation/Step 7.png";
import BankReconciliationStep8 from "../../../public/UserManual/BankReconciliation/Step 8.png";
import BankReconciliationStep9 from "../../../public/UserManual/BankReconciliation/Step 9.png";
import BankReconciliationStep10 from "../../../public/UserManual/BankReconciliation/Step 10.png";
import BankReconciliationStep11 from "../../../public/UserManual/BankReconciliation/Step 11.png";
import BankReconAccStep1 from "../../../public/UserManual/BankReconAcc/Step1.png";
import BankReconAccStep2 from "../../../public/UserManual/BankReconAcc/Step2.png";
import BankReconAccStep3 from "../../../public/UserManual/BankReconAcc/Step3.1.png";
import BankReconAccStep31 from "../../../public/UserManual/BankReconAcc/Step3.2.png";
import BankReconAccStep4 from "../../../public/UserManual/BankReconAcc/Step4.png";
import BankReconAccStep5 from "../../../public/UserManual/BankReconAcc/Step5.png";
import BankReconAccStep6 from "../../../public/UserManual/BankReconAcc/Step6.png";
import BankReconAccStep7 from "../../../public/UserManual/BankReconAcc/Step7.png";
import BankReconAccStep8 from "../../../public/UserManual/BankReconAcc/Step8.png";
import BankReconAccStep9 from "../../../public/UserManual/BankReconAcc/Step9.png";
import BankReconAccStep10 from "../../../public/UserManual/BankReconAcc/Step10.png";
import BankReconAccStep11 from "../../../public/UserManual/BankReconAcc/Step11.png";
import BankReconAccStep12 from "../../../public/UserManual/BankReconAcc/Step12.png";
import BankReconAccStep13 from "../../../public/UserManual/BankReconAcc/Step13.png";
import BankReconAccStep14 from "../../../public/UserManual/BankReconAcc/Step14.png";
import BankReconAccStep15 from "../../../public/UserManual/BankReconAcc/Step15.png";
import LooseLeafStep1 from "../../../public/UserManual/LooseLeaf/step1.png";
import LooseLeafStep2 from "../../../public/UserManual/LooseLeaf/step2.png";
import LooseLeafStep3 from "../../../public/UserManual/LooseLeaf/step3.png";
import LooseLeafStep4 from "../../../public/UserManual/LooseLeaf/step4.png";
import LooseLeafStep5 from "../../../public/UserManual/LooseLeaf/step5.png";
import SLSPStep1 from "../../../public/UserManual/SLSP/step2.png";
import SLSPStep2 from "../../../public/UserManual/SLSP/step2.5.png";
import SLSPStep3 from "../../../public/UserManual/SLSP/step3.png";
import SLSPStep4 from "../../../public/UserManual/SLSP/step4.png";
import SLSPStep5 from "../../../public/UserManual/SLSP/step5.png";
import SLSPStep6 from "../../../public/UserManual/SLSP/step6.png";
import SLSPStep7 from "../../../public/UserManual/SLSP/step7.png";
import SLSPStep8 from "../../../public/UserManual/SLSP/step8.png";
import SLSPStep9 from "../../../public/UserManual/SLSP/step8.5.png";
import SLSPStep10 from "../../../public/UserManual/SLSP/step10.png";
import SLSPStep11 from "../../../public/UserManual/SLSP/step11.png";
import SLSPStep12 from "../../../public/UserManual/SLSP/step11.5.png";
import SAWTStep1 from "../../../public/UserManual/SAWT/step2.png";
import SAWTStep2 from "../../../public/UserManual/SAWT/step2.5.png";
import SAWTStep3 from "../../../public/UserManual/SAWT/step3.png";
import SAWTStep4 from "../../../public/UserManual/SAWT/step4.png";
import SAWTStep5 from "../../../public/UserManual/SAWT/step5.png";
import SAWTStep7 from "../../../public/UserManual/SAWT/step7.png";
import SAWTStep10 from "../../../public/UserManual/SAWT/step10.png";
import SAWTStep11 from "../../../public/UserManual/SAWT/step11.png";
import SAWTStep12 from "../../../public/UserManual/SAWT/step11.5.png";
import ReportStep1 from "../../../public/UserManual/Report/A1.png"
import ReportStep2 from "../../../public/UserManual/Report/A2.png"
import ReportStep3 from "../../../public/UserManual/Report/M1.png"
import ReportStep4 from "../../../public/UserManual/Report/M2.png"
import ReportStep5 from "../../../public/UserManual/Report/M3.png"
import ReportStep6 from "../../../public/UserManual/Report/M4.png"
import ReportStep7 from "../../../public/UserManual/Report/M6.png"
import ReportStep8 from "../../../public/UserManual/Report/M7.png"
import ReportStep9 from "../../../public/UserManual/Report/M8.png"

//Components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";

export default function UserManual() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>("getting-started");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const tabs = [

    {
      value: "invoices",
      label: "Invoices",
      content: (
        <>
          {" "}
          <h1> Invoice User Manual </h1>
          <h3 className="UserManualSubheading">
            Form that allows the user to record invoices.
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/invoiceform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Invoice Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Invoice Tutorial </h2>
          <h4 className="StepTitle"> 1. Enter email for the receipt.</h4>
          <p className="StepDescription">
            {" "}
            - This Email will receive the email receipt.{" "}
          </p>
          <img src={InvoiceStep1} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            2. Choose the TIN number of the customer you want to make an expense
            for. If the TIN number is not available, use the link to register
            your customer.{" "}
          </h4>
          <p className="StepDescription"> - Example:000-000-000</p>
          <img src={InvoiceStep2} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            3.Fill in the information for your invoice.
          </h4>
          <img src={InvoiceStep3} className="imgUser1" />
          <h4 className="StepTitle"> 4.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page with the information entered will appear.
            Choose Yes or No in the dropdown and click submit. If Yes, the
            invoice will be entered. If No, the invoice entry will be cancelled
            and you will be taken back to the start.
          </p>
          <img src={InvoiceStep4} className="imgUser1" />
          <h4 className="StepTitle"> 5..Check your email for your receipt.</h4>
          <img src={InvoiceStep5} className="imgUser2" />
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
          <h3 className="UserManualSubheading">
            Instruction on how to use Collection Receipts
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/collectionreceiptform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Collection Receipt Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Collection Receipt Tutorial </h2>
          <h4 className="StepTitle">
            {" "}
            1.Select from the dropdown a vendor whose bills you want to pay.
          </h4>
          <img src={CollectionStep1} className="imgUser1" />
          <h4 className="StepTitle"> 2. Fill in the information </h4>
          <p className="StepDescription">
            {" "}
            - Input the payment account, payment method, and reference number
          </p>
          <img src={CollectionStep2} className="imgUser2" />
          <h4 className="StepTitle">
            {" "}
            3.Select the invoice rows you want to pay and the payment amount for
            each.
          </h4>
          <p className="StepDescription">
            {" "}
            - Then click Submit Payment. You can also have the payment be higher
            than the balance amount.
          </p>
          <img src={CollectionStep3} className="imgUser2" />
          <h4 className="StepTitle"> 4.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page will appear showing the details and payments
            you are about to make. If your payment amount was higher than your
            balance, an amount to be credited will be listed.
          </p>
          <img src={CollectionStep4} className="imgUser2" />
          <h4 className="StepTitle">
            {" "}
            5. If the payment and payment details are correct, click Confirm
            Payment. If not, click Cancel Payment.
          </h4>
          <h4 className="StepTitle">
            {" "}
            6.After confirming the payment, you will be shown a voucher page
            where you can print the payment voucher or download it as a PDF.
          </h4>
          <img src={CollectionStep5} className="imgUser2" />
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
          <h3 className="UserManualSubheading">
            Instruction on how to use Petty Cash
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/pettycashform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Petty Cash Expenses Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Petty Cash Tutorial </h2>
          <h4 className="StepTitle"> 1. Enter email for the receipt.</h4>
          <p className="StepDescription">
            {" "}
            - This Email will receive the email receipt.{" "}
          </p>
          <img src={PettyStep1} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            2. Choose the TIN number of the supplier you want to make an expense
            for. If the TIN number is not available, use the link to register
            your supplier.{" "}
          </h4>
          <p className="StepDescription"> - Example:000-000-000</p>
          <img src={PettyStep2} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            3.Fill in the information for your Petty Cash expense.
          </h4>
          <img src={PettyStep3} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            4.Confirmation Page
          </h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page with the information entered will appear.
            Choose Yes or No in the dropdown and click submit. If Yes, the bill
            expense will be entered. If No, the expense will be cancelled and
            you will be taken back to the start.
          </p>
          <img src={PettyStep4} className="imgUser1" />
          <h4 className="StepTitle"> 5.Check your email for your receipt.</h4>

          <img src={PettyStep5} className="imgUser2" />
        </>
      ),
    },
    {
      value: "bills",
      label: "Bills",
      content: (
        <>
          {" "}
          <h1>  Bills User Manual </h1>
          <h3 className="UserManualSubheading">
            Form that allows the user to record bill expenses.
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/billsform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Bill Expenses Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Bill Tutorial </h2>
          <h4 className="StepTitle"> 1. Enter email for the receipt.</h4>
          <p className="StepDescription">
            {" "}
            - This Email will receive the email receipt.{" "}
          </p>
          <img src={BillStep1} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            2. Choose the TIN number of the supplier you want to make an expense
            for. If the TIN number is not available, use the link to register
            your supplier.{" "}
          </h4>
          <p className="StepDescription"> - Example:000-000-000</p>
          <img src={BillStep2} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            3.Fill in the information for your bill expense.
          </h4>
          <img src={BillStep3} className="imgUser1" />
          <h4 className="StepTitle"> 4.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page with the information entered will appear.
            Choose Yes or No in the dropdown and click submit. If Yes, the bill
            expense will be entered. If No, the expense will be cancelled and
            you will be taken back to the start.
          </p>
          <img src={BillStep4} className="imgUser1" />
          <h4 className="StepTitle"> 5.Check your email for your receipt.</h4>
          <img src={BillStep5} className="imgUser2" />
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
          <h3 className="UserManualSubheading">
            Form that allows the user to pay bills from vendors.
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/paymentform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Bills Payment Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Bills Payment Tutorial </h2>
          <h4 className="StepTitle">
            {" "}
            1.Select from the dropdown a vendor whose bills you want to pay.
          </h4>
          <img src={PaymentStep1} className="imgUser1" />
          <h4 className="StepTitle"> 2. Fill in the information </h4>
          <p className="StepDescription">
            {" "}
            - Input the payment account, payment method, and reference number
          </p>
          <img src={PaymentStep2} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            3.Select the bill rows you want to pay and the payment amount for
            each.
          </h4>
          <p className="StepDescription">
            {" "}
            - Then click Submit Payment. You can also have the payment be higher
            than the balance amount.
          </p>
          <img src={PaymentStep3} className="imgUser2" />
          <h4 className="StepTitle"> 4.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            -A confirmation page will appear showing the details and payments
            you are about to make. If your payment amount was higher than your
            balance, an amount to be credited will be listed.ted.
          </p>
          <img src={PaymentStep4} className="imgUser2" />
          <h4 className="StepTitle">
            {" "}
            5. If the payment and payment details are correct, click Confirm
            Payment. If not, click Cancel Payment.
          </h4>
          <h4 className="StepTitle">
            {" "}
            6.After confirming the payment, you will be shown a voucher page
            where you can print the payment voucher or download it as a PDF..
          </h4>
          <img src={PaymentStep5} className="imgUser2" />
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
          <h3 className="UserManualSubheading">
            Form that allows the user to record cheque disbursements.
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/chequedisbursementform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Cheque Disbursement Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Cheque Disbursement Tutorial </h2>
          <h4 className="StepTitle">
            {" "}
            1. Click the button to start the process.
          </h4>
          <img src={ChequeStep1} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            2. Choose the TIN number of the supplier you want to make an expense
            for. If the TIN number is not available, use the link to register
            your supplier.{" "}
          </h4>
          <p className="StepDescription"> - Example:000-000-000</p>
          <img src={ChequeStep2} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            3.Fill in the information for your cheque disbursement.
          </h4>
          <img src={ChequeStep3} className="imgUser1" />
          <h4 className="StepTitle"> 4.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page with the information entered will appear.
            Choose Yes or No in the dropdown and click submit. If Yes, the
            cheque disbursement will be entered. If No, the cheque disbursement
            entry will be cancelled and you will be taken back to the start.
          </p>
          <img src={ChequeStep4} className="imgUser1" />
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
          <h3 className="UserManualSubheading">
            Form that allows the user to make deposits to their account.
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/depositform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Deposit Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Deposit Tutorial </h2>
          <h4 className="StepTitle">
            {" "}
            1. Click the button to start the process.
          </h4>
          <img src={DepositStep1} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            2.Fill in the information for your deposit.
          </h4>
          <img src={DepositStep2} className="imgUser1" />
          <h4 className="StepTitle"> 3.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page with the information entered will appear.
            Choose Yes or No in the dropdown and click submit. If Yes, the
            deposit will be entered. If No, the deposit will be cancelled and
            you will be taken back to the start.
          </p>
          <img src={DepositStep3} className="imgUser1" />
          <h4 className="StepTitle"> 4.Check your email for your receipt.</h4>
          <img src={DepositStep4} className="imgUser2" />
        </>
      ),
    },
    {
      value: "transfers",
      label: "Transfers",
      content: (
        <>
          {" "}
          <h1> Fund Transfers User Manual </h1>
          <h3 className="UserManualSubheading">
            Form that allows the user to make both local and foreign fund
            transfers from an account to another account.
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/Transferform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Fund Transfer Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Fund Transfer Tutorial </h2>
          <h4 className="StepTitle">
            {" "}
            1. Choose either Local or Foreign for Type of Fund Transfer and
            click Start Recording Fund Transfer.
          </h4>
          <img src={TransferStep1} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            2.Fill in the information for your fund transfer.
          </h4>
          <p className="StepDescription">
            {" "}
            - <strong> NOTE: </strong> If your fund transfer is foreign, the
            currency should be the currency of the source account. The exchange
            rate should be the FX rate from the source account to the account
            who will get the transfer.
          </p>
          <img src={TransferStep2} className="imgUser1" />
          <h4 className="StepTitle"> 3.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page with the information entered will appear.
            Choose Yes or No in the dropdown and click submit. If Yes, the fund
            transfer will be entered. If No, the expense will be fund transfer
            and you will be taken back to the start.
          </p>
          <img src={TransferStep3} className="imgUser1" />
          <h4 className="StepTitle"> 4.Check your email for your receipt.</h4>
          <img src={TransferStep4} className="imgUser2" />
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
          <h3 className="UserManualSubheading">
            Instruction on how to use Withdrawals
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/Withdrawform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Withdraw Form
                </a>
              </List.Item>
            </List>
          </Group>
          <h2 className="UserManualHeading"> Withdraw Tutorial </h2>
          <h4 className="StepTitle">
            {" "}
            1. Click the button to start the process.
          </h4>
          <img src={WithdrawStep1} className="imgUser1" />
          <h4 className="StepTitle">
            {" "}
            2.Fill in the information for your Withdraw.
          </h4>
          <img src={WithdrawStep2} className="imgUser1" />
          <h4 className="StepTitle"> 3.Confirmation Page</h4>
          <p className="StepDescription">
            {" "}
            - A confirmation page with the information entered will appear.
            Choose Yes or No in the dropdown and click submit. If Yes, the
            withdrawal will be entered. If No, the withdrawal will be cancelled
            and you will be taken back to the start.
          </p>
          <img src={WithdrawStep3} className="imgUser1" />
          <h4 className="StepTitle"> 4.Check your email for your receipt.</h4>
          <img src={WithdrawStep4} className="imgUser2" />
        </>
      ),
    },

    {
      value: "bankreconciliation",
      label: "Bank Reconciliation",
      content: (
        <>
          {" "}
          <h1> Bank Reconciliation User Manual </h1>
          <h3 className="UserManualSubheading">
            Instruction on how to upload SOA for Bank Reconciliation
          </h3>
          <Group className="UserManualRequirments">
            <h2 className="UserManualHeading"> Requirements </h2>
            <List>
              <List.Item>
                <a
                  onClick={() => navigate("/bankreconciliationform")}
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {" "}
                  Bank Reconciliaiton Form
                </a>
              </List.Item>
              <ListItem>
                Access to your registered email account
              </ListItem>

            </List>
          </Group>
          <h2 className="UserManualHeading"> Bank Reconciliation Tutorial </h2>
          <h4 className="StepTitle">
            {" "}
            1. Check your email account every first of the month
          </h4>
          <p className="StepDescription">
            {" "}
            - An email containing the link to the Bank Reconciliation Form
            will be sent to your registered email account.
          </p>

          <img src={BankReconciliationStep1} className="imgUser2" />
          <h4 className="StepTitle">
            {" "}
            2.Open the email promptly and click the button (Upload SOA)
          </h4>
          <img src={BankReconciliationStep2} className="imgUser1" />
          <h4 className="StepTitle">3. Upon clicking, it will bring the user to the Official STEWRD Website (Log In Page) </h4>
          <p className="StepDescription">
            {" "}
            - Log in using your Client ID and Password.
          </p>
          <img src={BankReconciliationStep3} className="imgUser1" />
          <h4 className="StepTitle"> 4.The user will be directed automatically in the Bank Reconciliation Form </h4>
          <img src={BankReconciliationStep4} className="imgUser2" />
          <h4 className="StepTitle"> 5.Fill in the information to proceed </h4>
          <img src={BankReconciliationStep5} className="imgUser2" />
          <h4 className="StepTitle"> 6.Choose the bank type for you Statement of Account:</h4>
          <img src={BankReconciliationStep6} className="imgUser2" />
          <h4 className="StepTitle">7. Click “Choose File” to select the statement of account document then “Submit”.</h4>
          <p className="StepDescription">
            {" "}
            - Supported file types are .xls or .xlsx. </p><div className="
            "></div>
          <img src={BankReconciliationStep7} className="imgUser1" />
          <h4 className="StepTitle"> 8. The confirmation page will show after your successful submission. </h4>
          <img src={BankReconciliationStep8} className="imgUser1" />
          <h2 className="UserManualHeading"> Record/Submit the inquired transactions Tutorial </h2>

          <h4 className="StepTitle">
            {" "}
            1. Check your email account if you received a “For Inquiry Transactions” email.
          </h4>
          <p className="StepDescription">
            {" "}
            - Email is sent once the Accountant is done checking your the transactions.
          </p>
          <img src={BankReconciliationStep9} className="imgUser2" />

          <h4 className="StepTitle">
            {" "}
            2. Once inside the email, click the “Visit Portal” button.
          </h4>
          <img src={BankReconciliationStep10} className="imgUser1" />


          <h4 className="StepTitle">3. Upon clicking, it will bring the user to the Official STEWRD Website (Log In Page) </h4>
          <p className="StepDescription">
            {" "}
            - Log in using your Client ID and Password.
          </p>
          <img src={BankReconciliationStep11} className="imgUser1" />
        </>
      ),
    },
    ...(userRole === "accountant"
      ? [
        {
          value: "AccountantBankReconciliation",
          label: " Accountant Bank Reconciliation",
          content: (
            <>
              <h1> Bank Reconciliation User Manual </h1>
              <h3 className="UserManualSubheading">
                Bank Reconciliation for Accountants User Manual
              </h3>
              <Group className="UserManualRequirments">
                <h2 className="UserManualHeading"> Requirements </h2>
                <List>
                  <List.Item>
                    <a
                      onClick={() =>
                        window.open(
                          "https://docs.google.com/spreadsheets/d/1ZohvisAm62h_wckovfYhVMgp5ZxfV0PTactI6aeIHtM/edit?usp=sharing"
                        )
                      }
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      Bank Reconciliaiton Spreadsheet
                    </a>
                  </List.Item>
                  <ListItem>Access to your registered email account</ListItem>
                </List>
              </Group>
              <h2 className="UserManualHeading">
                {" "}
                Bank Reconciliation Tutorial{" "}
              </h2>
              <p className="StepDescription">
                <strong> NOTE: </strong> If client has submitted SOA and no inquiry is needed, proceed to{" "}
                <a
                  href="#upload-bank-reconciliation"
                  style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("upload-bank-reconciliation")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Upload Bank Reconciliation Report
                </a>{" "}

              </p>
              <h4 className="StepTitle">
                {" "}
                1. Upon the submission of Statement of Account. The accountant
                will receive an email notification
              </h4>
              <p className="StepDescription">
                {" "}
                - An email containing Upload details will be sent to your
                registered email account.
              </p>

              <img src={BankReconAccStep1} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                2. Go to the Google Sheet of{" "}
                <a
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/spreadsheets/d/1ZohvisAm62h_wckovfYhVMgp5ZxfV0PTactI6aeIHtM/edit?usp=sharing"
                    )
                  }
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff",
                  }}
                >
                  SOA_Submissions{" "}
                </a>
                . The data should be available there.
              </h4>
              <img src={BankReconAccStep2} className="imgUser2" />
              <h4 className="StepTitle">
                3.Edit & Save something first to trigger the automatic
                creation of checkbox.
              </h4>
              <p className="StepDescription"> Before:</p>

              <img src={BankReconAccStep3} className="imgUser2" />
              <p className="StepDescription"> After:</p>

              <img src={BankReconAccStep31} className="imgUser2" />

              <h4 className="StepTitle">
                {" "}
                4.Once the checkbox has been applied, delete the edited
                content (if not necessary for bank reconciliation.){" "}
              </h4>

              <h4 className="StepTitle">
                {" "}
                5.Check the checkbox under the “For Inquiry” columns for the
                transactions you want to inquire about
              </h4>
              <img src={BankReconAccStep4} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                6.Click the “SEND INQUIRY” button and a confirmation dialog
                box should come out.{" "}
              </h4>
              <img src={BankReconAccStep5} className="imgUser1" />
              <h4 className="StepTitle">
                7. Wait for 30 seconds and the “Inquired” column should also
                be checked in relation to the items you inquired about.{" "}
              </h4>
              <p className="StepDescription">
                {" "}
                - Once checked, it confirms that the inquiry email has been
                sent.{" "}
              </p>
              <div
                className="
            "
              ></div>
              <img src={BankReconAccStep6} className="imgUser2" />

              <h2 id="upload-bank-reconciliation" className="UserManualHeading">
                {" "}
                How to upload the Bank Reconciliation Report:{" "}
              </h2>

              <h4 className="StepTitle">
                {" "}
                1. Export Bank Reconciliation Report from QBO as PDF.
              </h4>
              <p className="StepDescription">
                {" "}
                <strong> NOTE: </strong> After exporting the file, if no inquiries were made, Manually Log In to STEWRD Website and proceed to step 5 of Upload Bank Reconciliation Report.
              </p>
              <h4 className="StepTitle">
                {" "}

                2. The accountant will receive an email to Upload the Bank
                Reconciliation Report
              </h4>

              <p className="StepDescription">
                {" "}
                - after the allotted time for clients to record their
                transaction is done.
              </p>

              <img src={BankReconAccStep7} className="imgUser2" />

              <h4 className="StepTitle">
                {" "}
                3. Open the email promptly and click the “Upload Report”.
              </h4>
              <img src={BankReconAccStep8} className="imgUser1" />

              <h4 className="StepTitle">
                4. Upon clicking, it will bring the accountant to the Official
                STEWRD Website (Log In Page){" "}
              </h4>
              <p className="StepDescription">
                {" "}
                - Log in using your Client ID and Password.
              </p>
              <img src={BankReconAccStep9} className="imgUser1" />
              <h4 className="StepTitle">
                5. After Loging In, Click the Bank Reconciliation{" "}
              </h4>
              <p className="StepDescription">
                {" "}
                - Located In the Side Navigation.
              </p>
              <img src={BankReconAccStep15} className="imgUser1" />

              <h4 className="StepTitle">
                {" "}
                6.Click Upload Bank Reconciliation Report{" "}
              </h4>

              <img src={BankReconAccStep10} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                7. Click “Choose File” to select the bank reconciliation
                report then “Submit”
              </h4>

              <img src={BankReconAccStep11} className="imgUser1" />


              <img src={BankReconAccStep12} className="imgUser1" />

              <h4 className="StepTitle">
                {" "}
                8.The accountant can go back to the bank reconciliation tab
                and click the “Bank Reconciliation Report”.
              </h4>

              <img src={BankReconAccStep13} className="imgUser2" />

              <h4 className="StepTitle">
                9.The accountant can view the uploaded Bank Reconciliation
                Reports here:{" "}
              </h4>

              <img src={BankReconAccStep14} className="imgUser2" />
            </>
          ),
        },
      ]
      : []),

    ...(userRole === "accountant"
      ? [
        {
          value: "looseleaf",
          label: "Loaseleaf ",
          content: (
            <>
              {" "}
              <h1>Manual Generation of Looseleaf User Manual </h1>
              <h3 className="UserManualSubheading">
                Instruction on how to generate looseleaf manually
              </h3>
              <Group className="UserManualRequirments">
                <h2 className="UserManualHeading"> Requirements </h2>
                <List>
                  <List.Item>
                    <a
                      onClick={() => navigate("/looseleafform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      Looseleaf Form
                    </a>
                  </List.Item>
                </List>
              </Group>
              <h2 className="UserManualHeading">
                {" "}
                Generate looseleaf Tutorial{" "}
              </h2>
              <h4 className="StepTitle"> 1. Log into Stewrd's Web Portal</h4>
              <h4 className="StepTitle">
                {" "}
                2. Navigate to Reports → Looseleaf Generator
              </h4>
              <h4 className="StepTitle">
                {" "}
                3. Select any date of the month you want the report to be
                generated
              </h4>
              <img src={LooseLeafStep2} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                4.Select email where the report will be sent:
              </h4>
              <p className="StepDescription">
                {" "}
                - My Registered Email (Will go to
                help@crowdsourcesolutions.ph, inspire@crowdsourcesolutions.ph,
                solve@crowdsourcesolutions.ph)
              </p>
              <img src={LooseLeafStep3} className="imgUser1" />
              <p className="StepDescription">
                {" "}
                - Another Email Address (Must enter on customEmail on where
                the report will be sent)
              </p>
              <img src={LooseLeafStep4} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                5.Check your email within 5 minutes if you have received the
                report.
              </h4>
              <h4 className="StepTitle">
                {" "}
                6. You can now view your Looseleaf report on your email
              </h4>
              <img src={LooseLeafStep5} className="imgUser2" />
            </>
          ),
        },
      ]
      : []),
    ...(userRole === "accountant"
      ? [
        {
          value: "SummaryAlphalistofWithholdingTaxatSourceSAWT",
          label: "Summary Alphalist of Withholding Tax at Source",
          content: (
            <>
              {" "}
              <h1> Summary Alphalist of Withholding Tax at Source (SAWT) User Manual</h1>
              <h3 className="UserManualSubheading">
                Instruction on how to convert QBO CSV reports to DAT files
              </h3>
              <Group className="UserManualRequirments">
                <h2 className="UserManualHeading"> Requirements </h2>
                <List>
                  <List.Item>
                    <a
                      onClick={() => navigate("/sawtform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      SAWT Report Upload Form
                    </a>
                  </List.Item>
                  <List.Item>
                    <a
                      onClick={() => navigate("/sawtviewform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      SLSP and SAWT Google Sheet
                    </a>
                  </List.Item>
                </List>
              </Group>
              <h2 className="UserManualHeading">
                {" "}
                How to upload SAWT Reports{" "}
              </h2>
              <h4 className="StepTitle">
                {" "}
                1. Download the appropriate Transaction Reports from
                QuickBooks Online as a CSV file.
              </h4>
              <h4 className="StepTitle">
                {" "}
                2. Remove rows 1-3 and row 4 until row 5 becomes the header.
              </h4>
              <p className="StepDescription">Before:</p>
              <img src={SAWTStep1} className="imgUser2" />
              <p className="StepDescription">After:</p>
              <img src={SAWTStep2} className="imgUser2" />
              <h4 className="StepTitle"> 3. In the A1, add the word ‘ATC’ as the header title and fill in the ATC code for each row.</h4>
              <img src={SAWTStep3} className="imgUser2" />
              <h4 className="StepTitle"> 4. Save the file.</h4>
              <img src={SAWTStep4} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                5.Upload the report to the{" "}
                <a
                  onClick={() => navigate("/sawtform")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff"
                  }}
                >
                  {" "}
                  SAWT Report Upload Form.{" "}
                </a>
              </h4>
              <img src={SAWTStep5} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                5. Go to the SLSP and SAWT Google Sheet Template in tab ‘SAWT Template’.
              </h4>
              <h4 className="StepTitle">
                {" "}
                6. Wait for it to fill up.
              </h4>
              <p className="StepDescription">
                <a
                  onClick={() => navigate("/sawtviewform")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff"
                  }}
                > - SLSP and Sawt Google Sheet</a>
              </p>
              <img src={SAWTStep7} className="imgUser2" />

              <h4 className="StepTitle">
                {" "}
                8.Take the time to double check all the information and
                correct anything wrong or missing.
              </h4>
              <p className="StepDescription">
                (e.g. missing TINs, missing Supplier Addresses, wrong values,
                etc).{" "}
              </p>

              <h4 className="StepTitle">
                {" "}
                9. Go to the Convert to DAT tab in the Google Sheets.
              </h4>
              <h4 className="StepTitle">
                {" "}
                10.Click the ‘Convert Sales and Purchases to DAT File and Send
                Email’ button.
              </h4>
              <p className="StepDescription1" color="Red">
                {" "}
                <strong> IMPORTANT: </strong> Once submitted, the sheets will
                clear up and you will no longer be able to edit the templates.
                Ensure that all information is complete and final before
                submitting.
              </p>
              <img src={SAWTStep10} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                11. Two emails will be sent to you; one with the DAT files and
                one with an XLSX copy of the Google Sheet.
              </h4>
              <img src={SAWTStep11} className="imgUser2" />
              <img src={SAWTStep12} className="imgUser2" />
            </>
          ),
        },
      ]
      : []),
    ...(userRole === "accountant"
      ? [
        {
          value: "SalesandPurchases(SLSP)",
          label: "Sales and Purchases (SLSP) ",
          content: (
            <>
              {" "}
              <h1> Sales and Purchases Compliance (SLSP) User Manual</h1>
              <h3 className="UserManualSubheading">
                Instruction on how to convert QBO CSV reports to DAT files
              </h3>
              <Group className="UserManualRequirments">
                <h2 className="UserManualHeading"> Requirements </h2>
                <List>
                  <List.Item>
                    <a
                      onClick={() => navigate("/salesform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      SLSP Sales Form
                    </a>
                  </List.Item>
                  <List.Item>
                    <a
                      onClick={() => navigate("/purchaseform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      SLSP Purchases Form
                    </a>
                  </List.Item>
                  <List.Item>
                    <a
                      onClick={() => navigate("/sawtviewform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      SLSP and SAWT Google Sheet
                    </a>
                  </List.Item>
                </List>
              </Group>
              <h2 className="UserManualHeading">
                {" "}
                How to upload SLSP Reports{" "}
              </h2>
              <h4 className="StepTitle">
                {" "}
                1. Download the appropriate Transaction Reports from
                QuickBooks Online as a CSV file.
              </h4>
              <h4 className="StepTitle">
                {" "}
                2. For both reports, remove rows 1-3 until row 4 becomes the
                header
              </h4>
              <p className="StepDescription">Before:</p>
              <img src={SLSPStep1} className="imgUser2" />
              <p className="StepDescription">After:</p>
              <img src={SLSPStep2} className="imgUser2" />
              <h4 className="StepTitle"> 3. Save the file.</h4>
              <img src={SLSPStep3} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                4.Upload the report to the{" "}
                <a
                  onClick={() => navigate("/salesform")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff"
                  }}
                >
                  {" "}
                  SLSP Compliance - Sales form.{" "}
                </a>
              </h4>
              <img src={SLSPStep4} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                5. Wait for the Sales Template in the Google Sheet to fill up.
              </h4>
              <p className="StepDescription">
                <a
                  onClick={() => navigate("/sawtviewform")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff"
                  }}
                > - SLSP and Sawt Google Sheet</a>
              </p>
              <img src={SLSPStep5} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                6. Upload the report to the        <a
                  onClick={() => navigate("/purchaseform")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff"
                  }}
                > SLSP Compliance - Purchases form.</a>
              </h4>
              <img src={SLSPStep6} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                7. Wait for the Purchases Template in the Google Sheet to fill
                up.
              </h4>
              <p className="StepDescription">
                <a
                  onClick={() => navigate("/sawtviewform")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff"
                  }}
                > - SLSP and Sawt Google Sheet</a>
              </p>
              <img src={SLSPStep7} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                8.Take the time to double check all the information and
                correct anything wrong or missing.
              </h4>
              <p className="StepDescription">
                (e.g. missing TINs, missing Supplier Addresses, wrong values,
                etc).{" "}
              </p>
              <img src={SLSPStep8} className="imgUser2" />
              <img src={SLSPStep9} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                9. Go to the Convert to DAT tab in the Google Sheets.
              </h4>
              <h4 className="StepTitle">
                {" "}
                10.Click the ‘Convert Sales and Purchases to DAT File and Send
                Email’ button.
              </h4>
              <p className="StepDescription1" color="Red">
                {" "}
                <strong> IMPORTANT: </strong> Once submitted, the sheets will
                clear up and you will no longer be able to edit the templates.
                Ensure that all information is complete and final before
                submitting.
              </p>
              <img src={SLSPStep10} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                11. Two emails will be sent to you; one with the DAT files and
                one with an XLSX copy of the Google Sheet.
              </h4>
              <img src={SLSPStep11} className="imgUser2" />
              <img src={SLSPStep12} className="imgUser2" />
            </>
          ),
        },
      ]
      : []),
    ...(userRole === "accountant"
      ? [
        {
          value: "FinancialReports",
          label: "Financial Reports ",
          content: (
            <>
              {" "}
              <h1> Financial Reports User Manual</h1>
              <h3 className="UserManualSubheading">
                Instruction on how to generate financisl reports
              </h3>
              <Group className="UserManualRequirments">
                <h2 className="UserManualHeading"> Requirements </h2>
                <List>
                  <List.Item>
                    <a
                      onClick={() => navigate("/reportform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      Manually Generate Financial Reports Form
                    </a>
                  </List.Item>
                  <List.Item>
                    CRITICAL: Books must be closed for the reporting period
                  </List.Item>
                </List>
                <h4 className="StepTitle"> Your report closure timing is tracked with a gamified scoring system: </h4>
                <Table
                  className="UserTable"
                  withTableBorder
                  withColumnBorders
                  highlightOnHover
                  striped
                  verticalSpacing="sm"
                  horizontalSpacing="md"
                  style={{ width: "100%", maxWidth: 600, margin: "auto" }}
                >
                  <thead>
                    <tr>
                      <th>Days</th>
                      <th>Score</th>
                      <th>Status</th>
                      <th>Bonus Eligible?</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Days 4-7</td>
                      <td>100%</td>
                      <td><Text fw={700}>EXCELLENT</Text></td>
                      <td>
                        <Center>

                          <Text ml={6} c="green" fw={500}>YES</Text>
                        </Center>
                      </td>
                    </tr>

                    <tr>
                      <td>Days 8-10</td>
                      <td>80%</td>
                      <td><Text fw={700}>GOOD</Text></td>
                      <td>
                        <Center>
                          <IconX size={18} color="red" />
                          <Text ml={6} c="red" fw={500}>No</Text>
                        </Center>
                      </td>
                    </tr>

                    <tr>
                      <td>Days 11-13</td>
                      <td>70%</td>
                      <td><Text fw={700}>FAIR</Text></td>
                      <td>
                        <Center>
                          <IconX size={18} color="red" />
                          <Text ml={6} c="red" fw={500}>No</Text>
                        </Center>
                      </td>
                    </tr>

                    <tr>
                      <td>Days 14-15</td>
                      <td>0%</td>
                      <td><Text fw={700}>OVERDUE</Text></td>
                      <td>
                        <Center>
                          <IconX size={18} color="red" />
                          <Text ml={6} c="red" fw={500}>No</Text>
                        </Center>
                      </td>
                    </tr>
                  </tbody>
                </Table>

              </Group>
              <h2 className="UserManualHeading">
                {" "}
                How to Generate Monthly Reports
              </h2>
              <p className="StepDescription"> Reports are generated automatically every 7th of the month if books are properly closed. You can also generate reports manually for any month using the steps below.
              </p>
              <h4 className="StepTitle">

                AUTOMATIC GENERATION No Action Required
              </h4>
              <p className="StepDescription">When: Every 7th of the month at 10:30 AM </p>
              <h4 className="StepTitle">

                What Happens:

              </h4>
              <p className="StepDescription">1.System checks if books are closed for the previous month</p>
              <p className="StepDescription">2.If books are closed, reports are generated and sent to your registered email</p>
              <p className="StepDescription">3. IF NOT CLOSED: You receive a reminder email instead</p>

              <h4 className="StepTitle">
                {" "}
                What You Need to Do:

              </h4>
              <p className="StepDescription">
                Check your email inbox on the 7th of each month
              </p>
              <img src={ReportStep1} className="imgUser2" />

              <p className="StepDescription">
                Look for subject: STEWRD | Monthly Financial Reports - Month Year | Company Name
              </p>
              <img src={ReportStep2} className="imgUser2" />

              <h2 className="UserMnualHeading">


                MANUAL GENERATION (For Other Months)

              </h2>
              <p className="StepDescription">
                If you need reports for a different month (past months or current month before the 7th), follow these steps:
              </p>

              <h4 className="StepTitle">
                {" "}
                1. Log into Stewrd's Web Portal
              </h4>
              <h4 className="StepTitle">
                {" "}
                2. Navigate to Reports → Manual Report Request
              </h4>
              <img src={ReportStep3} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                3. Select any date of the month you want the report to be
                generated
              </h4>
              <img src={ReportStep4} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                4.Select email where the report will be sent:
              </h4>
              <p className="StepDescription">
                {" "}
                - My Registered Email (Will go to
                help@crowdsourcesolutions.ph, inspire@crowdsourcesolutions.ph,
                solve@crowdsourcesolutions.ph)
              </p>
              <img src={ReportStep5} className="imgUser1" />
              <p className="StepDescription">
                {" "}
                - Another Email Address (Must enter on customEmail on where
                the report will be sent)
              </p>
              <img src={ReportStep6} className="imgUser1" />

              <h4 className="StepTitle">
                {" "}
                5.Click Submit
              </h4>

              <p className="Step Desscription"> Do not submit another request for the same period </p>
              <p className="Step Desscription"> SAMPLE : Requested Period: October 2025 </p>
              <img src={ReportStep7} className="imgUser2" />

              <h4 className="StepTitle">
                {" "}
                5.Check your email within 5-10 minutes if you have received the
                report.
              </h4>

              <p className="Step Desscription">  If you don’t receive it within 10 minutes: </p>
              <p className="Step Desscription"> <a
                onClick={() =>
                  window.open(
                    "https://docs.google.com/document/d/1ATMBph2UW4Qz_KEFojqlFQEEOAnhJ0RnWAm4gYNlGzM/edit?usp=sharing"
                  )
                }
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                {" "} Troubleshooting Guide here: (p.10)</a>  </p>
              <h4 className="StepTitle">
                {" "}
                6. You can now view your report on your email
              </h4>
              <img src={ReportStep9} className="imgUser2" />
            </>
          ),
        },
      ]
      : []),
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
        {/* Floating menu button */}
        <Button
          className="UserManualBurger"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
        </Button>

        {/* Overlay */}
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
          {/* Drawer for mobile tabs */}
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

          {/* Panels */}
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