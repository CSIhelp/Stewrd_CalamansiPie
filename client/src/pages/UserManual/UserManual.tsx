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

//Components
import Header from "../../components/Header/Header";
import { SideNavBar } from "../../components/SideNav/SideNavBar";

export default function UserManual() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string | null>("getting-started");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
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

          <img src={BankReconciliationStep1 } className="imgUser2" />
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
          <img src={BankReconciliationStep7 } className="imgUser1" />
                    <h4 className="StepTitle"> 8. The confirmation page will show after your successful submission. </h4>
          <img src={BankReconciliationStep8 } className="imgUser1" />
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
