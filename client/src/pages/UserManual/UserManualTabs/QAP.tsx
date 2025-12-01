import React from "react";
import { Group, List, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import QAPStep1 from "../../../../public/UserManual/QAP/Step 4.png";
import QAPStep2 from "../../../../public/UserManual/QAP/Step 5.png";
import QAPStep8 from "../../../../public/UserManual/QAP/Step 6.3.png";
import QAPStep9 from "../../../../public/UserManual/QAP/Step 6.1.png";
import QAPStep10 from "../../../../public/UserManual/QAP/Step 6.2.png";
import QAPStep4 from "../../../../public/UserManual/QAP/Step 7.png";
import QAPStep5 from "../../../../public/UserManual/QAP/Step 8.png";
import QAPStep6 from "../../../../public/UserManual/QAP/Step 8.1.png";
import QAPStep7 from "../../../../public/UserManual/QAP/Step 8.2.png";
const QAP = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1> Quarterly Alphalist of Payees (QAP) User Manual</h1>
              <h3 className="UserManualSubheading">
                Instruction on how to convert QBO CSV reports to DAT files
              </h3>
              <Group className="UserManualRequirments">
                <h2 className="UserManualHeading"> Requirements </h2>
                <List>
                  <List.Item>
                    <a
                      onClick={() => navigate("/qapform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      QAP Upload Form
                    </a>
                  </List.Item>
                  <List.Item>
                    <a
                      onClick={() => navigate("/aapviewform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      QAP and AAP Google Sheet
                    </a>
                  </List.Item>
                </List>
              </Group>
              <h2 className="UserManualHeading">
                {" "}
                How to submit the Quarterly Alphalist of Payees
              </h2>
              <h4 className="StepTitle">
                {" "}
                1. Log in to STEWRD - Official Website.
              </h4>
              <h4 className="StepTitle">
                {" "}
                2. Go to Reports Tab, under it is the Tax Compliance.
              </h4>
              <h4 className="StepTitle"> 3. Click the “Submit QAP” button.</h4>
             
              <h4 className="StepTitle"> 4. Upload the QAP and the Email you want to receive the DAT Files, once uploaded a confirmation page should show.</h4>
              <img src={QAPStep1} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                5.Now, go to the spreadsheet and check the “BIR Format - Raw Data”, after confirming the data is in there proceed to the “Buttons” Tab.
                <a
                  onClick={() => navigate("/aapviewform")}
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "#007bff"
                  }}
                >
                  {" "}
                  QAP and AAP Spreadsheet.{" "}
                </a>
              </h4>
              <img src={QAPStep2} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                6. Click the “CONVERT QAP RAW DATA TO QAP BIR FORMAT” to have the BIR Format Excel File, you may also check the “QAP DAT TEMPLATE” in this process to check if the data is correct.
              </h4>
              <img src={QAPStep9} className="imgUser2" />
              <p className="StepDescription">QAP BIR FORMAT:</p>
              <img src={QAPStep8} className="imgUser2" />
              <p className="StepDescription">QAP DAT TEMPLATE:</p>
              <img src={QAPStep10} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                7. Once confirmed, go back to “Buttons” Tab and click the “CONVERT QAP BIR FORMAT TO DAT FILE” button
              </h4>

              <img src={QAPStep4} className="imgUser2" />

              <h4 className="StepTitle">
                {" "}
                8.The Email you filled in earlier should receive the Email Message containing the “DAT File” and the “Record Keeping” Excel File.

              </h4>
              <p className="StepDescription" >
                Email Containing the DAT File:

              </p>
              <img src={QAPStep6} className="imgUser2" />
                 <p className="StepDescription" >
                Email Containing the Record Keeping: 

              </p>
                       <img src={QAPStep7} className="imgUser2" />      
              </>
  );
};

export default QAP;