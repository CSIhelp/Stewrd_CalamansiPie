import { Group, List, ListItem, Text } from "@mantine/core";
import { useNavigate } from 'react-router-dom';

import AAPStep1 from "../../../../public/UserManual/AAP/Step 4.png";
import AAPStep2 from "../../../../public/UserManual/AAP/Step 5.png";
import AAPStep3 from "../../../../public/UserManual/AAP/Step 6.1.png";
import AAPStep8 from "../../../../public/UserManual/AAP/Step 6.2.png";
import AAPStep9 from "../../../../public/UserManual/AAP/Step 6.3.png";
import AAPStep4 from "../../../../public/UserManual/AAP/Step 7.png";
import AAPStep5 from "../../../../public/UserManual/AAP/Step 8.1.png";
import AAPStep6 from "../../../../public/UserManual/AAP/Step 8.2.png";
import AAPStep7 from "../../../../public/UserManual/AAP/Step 8.3.png";

export default function AAP() {
    const navigate = useNavigate();
  return (
    <>
    <h1> Annual Alphalist of Payees (AAP) User Manual</h1>
              <h3 className="UserManualSubheading">
                Instruction on how to convert QBO CSV reports to DAT files
              </h3>
              <Group className="UserManualRequirments">
                <h2 className="UserManualHeading"> Requirements </h2>
                <List>
                  <List.Item>
                    <a
                      onClick={() => navigate("/alphalistform")}
                      style={{
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      {" "}
                      AAP Upload Form
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
              <h4 className="StepTitle"> 3. Click the “Submit AAP” button.</h4>
      
              <h4 className="StepTitle"> 4. Upload the AAP and the Email you want to receive the DAT Files, once uploaded a confirmation page should show.</h4>
              <img src={AAPStep1} className="imgUser1" />
              <h4 className="StepTitle">
                {" "}
                Now, go to the spreadsheet and check the “AAP BIR Format - Raw Data”, after confirming the data is in there proceed to the “Buttons” Tab.
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
              <img src={AAPStep2} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                6.Click the “CONVERT AAP RAW DATA TO AAP BIR FORMAT” to have the BIR Format Excel File, you may also check the “AAP DAT TEMPLATE” in this process to check if the data is correct.
              </h4>
              <img src={AAPStep3} className="imgUser2" />
              <p className="StepDescription">AAP BIR FORMAT:</p>
              <img src={AAPStep8} className="imgUser2" />
              <p className="StepDescription">AAP DAT TEMPLATE:</p>
              <img src={AAPStep9} className="imgUser2" />
              <h4 className="StepTitle">
                {" "}
                7.Once confirmed, go back to “Buttons” Tab and click the “CONVERT AAP BIR FORMAT TO DAT FILE” button
              </h4>

              <img src={AAPStep4} className="imgUser2" />

              <h4 className="StepTitle">
                {" "}
                8.The Email you filled in earlier should receive the Email Message containing the “DAT File” and the “Record Keeping” Excel File.

              </h4>
              <p className="StepDescription" >
                Email Containing the DAT File:

              </p>
              <img src={AAPStep6} className="imgUser2" />
                            <p className="StepDescription" >
               Email Containing the Record Keeping: 

              </p>
              <img src={AAPStep7} className="imgUser2" />
    </>
  );
}