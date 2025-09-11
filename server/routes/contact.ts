import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const ContactRouter = express.Router();

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
      return res.status(400).json({ message: "All required fields must be filled" });
    }
    try {
      // Test transporter (Ethereal)
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "nat.deckow@ethereal.email",
          pass: "4JJZP3fQzEC5PfvpqX",
        },
      });

      // Build email content
      let emailText = `
Name: ${name}
Company: ${company}
Email: ${email}
Topic: ${topic}
Message: ${message}
`;

      if (topic === "bug") {
        emailText += `
Bug Description: ${bugDescription || ""}
Time Encountered: ${timeEncountered || ""}
Date Encountered: ${dateEncountered || ""}
`;
      }

      const info = await transporter.sendMail({
        from: `"Website Contact" <tajelaj394@dpwev.com>`, // use your domain email
        to: "helpjohn@gmail.com", // your real inbox
        subject: `Contact Form Submission: ${topic}`,
        text: emailText,
        html: `<pre>${emailText}</pre>`,
      });

      res.status(200).json({ message: "Email sent successfully (test sender)", previewURL: nodemailer.getTestMessageUrl(info), });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send email" });
    }
  }
);

export default ContactRouter;
