import { Group, List, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";



import SAWTStep1 from "../../../../public/UserManual/SAWT/step2.png";
import SAWTStep2 from "../../../../public/UserManual/SAWT/step2.5.png";
import SAWTStep3 from "../../../../public/UserManual/SAWT/step3.png";
import SAWTStep4 from "../../../../public/UserManual/SAWT/step4.png";
import SAWTStep5 from "../../../../public/UserManual/SAWT/step5.png";
import SAWTStep7 from "../../../../public/UserManual/SAWT/step7.png";
import SAWTStep10 from "../../../../public/UserManual/SAWT/step10.png";
import SAWTStep11 from "../../../../public/UserManual/SAWT/step11.png";
import SAWTStep12 from "../../../../public/UserManual/SAWT/step11.5.png";
export default function SAWT() {
  const navigate = useNavigate();

  return (
    <>
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
  );
}