import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const ContactRouter = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequestBody {
  name: string;
  company: string;
  email: string;
  topic: string;
  message: string;
  bugDescription?: string;
  timeEncountered?: string;
  dateEncountered?: string;
}

ContactRouter.post(
  "/",
  async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    const {
      name,
      company,
      email,
      topic,
      message,
      bugDescription,
      timeEncountered,
      dateEncountered,
    } = req.body;

    if (!name || !company || !email || !topic || !message) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }
     try {
      let emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1)">
        <div style="background-color: #0d99ff; color: white; text-align: center; padding: 16px; font-size: 20px; font-weight: bold;">
          JOHN INQUIRIES
        </div>
        <div style="padding: 20px; color: #333; line-height: 1.5;">
          <h3 style="margin-bottom: 8px; color: #0d99ff;">Contact Information</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Topic:</strong> ${topic}</p>
          <p><strong>Message:</strong> ${message}</p>
          ${
            topic === "bug"
              ? `
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />
              <h3 style="margin-bottom: 8px; color: #e53935;">Bug Report</h3>
              <p><strong>Bug Description:</strong> ${bugDescription || "N/A"}</p>
              <p><strong>Time Encountered:</strong> ${timeEncountered || "N/A"}</p>
              <p><strong>Date Encountered:</strong> ${dateEncountered || "N/A"}</p>
            `
              : ""
          }
        </div>
        <div style="background-color: #f9f9f9; text-align: center; padding: 12px; font-size: 12px; color: #666;">
          This email was generated from john website contact form.
        </div>
      </div>
      `;

      const data = await resend.emails.send({
        from: "John Inquries <onboarding@resend.dev>", 
        to: "help@crowdsourcesolutions.ph",
        subject: `John Contact Form : ${topic}`,
        html: emailHtml,
      });

      res.status(200).json({ message: "Email sent successfully", data });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send email" });
    }
  }
);

export default ContactRouter;