import React from "react";
import { Group, List, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import SLSPStep1 from "../../../../public/UserManual/SLSP/step2.png";
import SLSPStep2 from "../../../../public/UserManual/SLSP/step2.5.png";
import SLSPStep3 from "../../../../public/UserManual/SLSP/step3.png";
import SLSPStep4 from "../../../../public/UserManual/SLSP/step4.png";
import SLSPStep5 from "../../../../public/UserManual/SLSP/step5.png";
import SLSPStep6 from "../../../../public/UserManual/SLSP/step6.png";
import SLSPStep7 from "../../../../public/UserManual/SLSP/step7.png";
import SLSPStep8 from "../../../../public/UserManual/SLSP/step8.png";
import SLSPStep9 from "../../../../public/UserManual/SLSP/step8.5.png";
import SLSPStep10 from "../../../../public/UserManual/SLSP/step10.png";
import SLSPStep11 from "../../../../public/UserManual/SLSP/step11.png";
import SLSPStep12 from "../../../../public/UserManual/SLSP/step11.5.png";
export default function SLSP() {
  const navigate = useNavigate();

  return (
    <>
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
  );
}