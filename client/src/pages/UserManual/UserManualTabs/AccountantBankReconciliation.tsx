import { Group, List, Text } from "@mantine/core";
import BankReconAccStep1 from "../../../../public/UserManual/BankReconAcc/Step1.png";
import BankReconAccStep2 from "../../../../public/UserManual/BankReconAcc/Step2.png";
import BankReconAccStep3 from "../../../../public/UserManual/BankReconAcc/Step3.1.png";
import BankReconAccStep31 from "../../../../public/UserManual/BankReconAcc/Step3.2.png";
import BankReconAccStep4 from "../../../../public/UserManual/BankReconAcc/Step4.png";
import BankReconAccStep5 from "../../../../public/UserManual/BankReconAcc/Step5.png";
import BankReconAccStep6 from "../../../../public/UserManual/BankReconAcc/Step6.png";
import BankReconAccStep7 from "../../../../public/UserManual/BankReconAcc/Step7.png";
import BankReconAccStep8 from "../../../../public/UserManual/BankReconAcc/Step8.png";
import BankReconAccStep9 from "../../../../public/UserManual/BankReconAcc/Step9.png";
import BankReconAccStep10 from "../../../../public/UserManual/BankReconAcc/Step10.png";
import BankReconAccStep11 from "../../../../public/UserManual/BankReconAcc/Step11.png";
import BankReconAccStep12 from "../../../../public/UserManual/BankReconAcc/Step12.png";
import BankReconAccStep13 from "../../../../public/UserManual/BankReconAcc/Step13.png";
import BankReconAccStep14 from "../../../../public/UserManual/BankReconAcc/Step14.png";
import BankReconAccStep15 from "../../../../public/UserManual/BankReconAcc/Step15.png";

const AccountantBankReconciliation = () => {
  return (
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
              Bank Reconciliation Spreadsheet
            </a>
          </List.Item>
          <List.Item>Access to your registered email account</List.Item>
        </List>
      </Group>
      <h2 className="UserManualHeading"> Bank Reconciliation Tutorial </h2>
      <p className="StepDescription">
        <strong> NOTE: </strong> If client has submitted SOA and no inquiry is needed, proceed to{" "}
        <a
          href="#upload-bank-reconciliation"
          style={{
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Upload Bank Reconciliation Report
        </a>
      </p>
      <h4 className="StepTitle">
        1. Upon the submission of Statement of Account. The accountant will receive an email notification
      </h4>
      <img src={BankReconAccStep1} className="imgUser1" />
      <h4 className="StepTitle">
        2. Go to the Google Sheet of{" "}
        <a
          onClick={() =>
            window.open(
              "https://docs.google.com/spreadsheets/d/1aKeYWJEKYd77jvk2GDwIrHku_t8s0HnHIfYb1zs4pXk/edit?usp=sharing"
            )
          }
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "#007bff",
          }}
        >
          SOA_Submissions
        </a>
        . The data should be available there.
      </h4>
      <img src={BankReconAccStep2} className="imgUser2" />
      <h4 className="StepTitle">
        3. Edit & Save something first to trigger the automatic creation of checkbox.
      </h4>
      <p className="StepDescription"> Before:</p>
      <img src={BankReconAccStep3} className="imgUser2" />
      <p className="StepDescription"> After:</p>
      <img src={BankReconAccStep31} className="imgUser2" />
      <h4 className="StepTitle">
        4. Once the checkbox has been applied, delete the edited content (if not necessary for bank reconciliation.)
      </h4>
      <h4 className="StepTitle">
        5. Check the checkbox under the “For Inquiry” columns for the transactions you want to inquire about
      </h4>
      <img src={BankReconAccStep4} className="imgUser2" />
      <h4 className="StepTitle">
        6. Click the “SEND INQUIRY” button and a confirmation dialog box should come out.
      </h4>
      <img src={BankReconAccStep5} className="imgUser1" />
      <h4 className="StepTitle">
        7. Wait for 30 seconds and the “Inquired” column should also be checked in relation to the items you inquired about.
      </h4>
      <p className="StepDescription">
        - Once checked, it confirms that the inquiry email has been sent.
      </p>
      <img src={BankReconAccStep6} className="imgUser2" />
      <h2 id="upload-bank-reconciliation" className="UserManualHeading">
        How to upload the Bank Reconciliation Report:
      </h2>
      <h4 className="StepTitle">
        1. Export Bank Reconciliation Report from QBO as PDF.
      </h4>
      <p className="StepDescription">
        <strong> NOTE: </strong> After exporting the file, if no inquiries were made, Manually Log In to STEWRD Website and proceed to step 5 of Upload Bank Reconciliation Report.
      </p>
      <h4 className="StepTitle">
        2. The accountant will receive an email to Upload the Bank Reconciliation Report
      </h4>
      <p className="StepDescription">
        - after the allotted time for clients to record their transaction is done.
      </p>
      <img src={BankReconAccStep7} className="imgUser2" />
      <h4 className="StepTitle">
        3. Open the email promptly and click the “Upload Report”.
      </h4>
      <img src={BankReconAccStep8} className="imgUser1" />
      <h4 className="StepTitle">
        4. Upon clicking, it will bring the accountant to the Official STEWRD Website (Log In Page)
      </h4>
      <p className="StepDescription">
        - Log in using your Client ID and Password.
      </p>
      <img src={BankReconAccStep9} className="imgUser1" />
      <h4 className="StepTitle">
        5. After Logging In, Click the Bank Reconciliation
      </h4>
      <p className="StepDescription">
        - Located In the Side Navigation.
      </p>
      <img src={BankReconAccStep15} className="imgUser1" />
      <h4 className="StepTitle">
        6. Click Upload Bank Reconciliation Report
      </h4>
      <img src={BankReconAccStep10} className="imgUser1" />
      <h4 className="StepTitle">
        7. Click “Choose File” to select the bank reconciliation report then “Submit”
      </h4>
      <img src={BankReconAccStep11} className="imgUser1" />
      <img src={BankReconAccStep12} className="imgUser1" />
      <h4 className="StepTitle">
        8. The accountant can go back to the bank reconciliation tab and click the “Bank Reconciliation Report”.
      </h4>
      <img src={BankReconAccStep13} className="imgUser2" />
      <h4 className="StepTitle">
        9. The accountant can view the uploaded Bank Reconciliation Reports here:
      </h4>
      <img src={BankReconAccStep14} className="imgUser2" />
    </>
  );
};

export default AccountantBankReconciliation;