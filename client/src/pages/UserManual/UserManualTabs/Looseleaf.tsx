import { Group, List, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import LooseLeafStep1 from "../../../../public/UserManual/LooseLeaf/step1.png";
import LooseLeafStep2 from "../../../../public/UserManual/LooseLeaf/step2.png";
import LooseLeafStep3 from "../../../../public/UserManual/LooseLeaf/step3.png";
import LooseLeafStep4 from "../../../../public/UserManual/LooseLeaf/step4.png";
import LooseLeafStep5 from "../../../../public/UserManual/LooseLeaf/step5.png";

export default function Looseleaf() {
  const navigate = useNavigate();

  return (
    <>
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
                <img src={LooseLeafStep4} className="imgUser1" />
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
  );
}