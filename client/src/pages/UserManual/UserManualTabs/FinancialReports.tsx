import React from 'react';
import { Group, List, Text, Table, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconMenu2, IconX } from "@tabler/icons-react";

import ReportStep1 from "../../../../public/UserManual/Report/A1.png";
import ReportStep2 from "../../../../public/UserManual/Report/A2.png";
import ReportStep3 from "../../../../public/UserManual/Report/M1.png";
import ReportStep4 from "../../../../public/UserManual/Report/M2.png";
import ReportStep5 from "../../../../public/UserManual/Report/M3.png";
import ReportStep6 from "../../../../public/UserManual/Report/M4.png";
import ReportStep7 from "../../../../public/UserManual/Report/M6.png";
import ReportStep8 from "../../../../public/UserManual/Report/M7.png";
import ReportStep9 from "../../../../public/UserManual/Report/M8.png";
const FinancialReports = () => {
  const navigate = useNavigate();
  return (
    <>
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
  );
};

export default FinancialReports;