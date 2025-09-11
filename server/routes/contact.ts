import express, { Request, Response } from "express";
import nodemailer from "nodemailer";

const ContactRouter = express.Router();

interface ContactRequestBody {
  name: string;
  email: string;
  message: string;
}

ContactRouter.post(
  "/",
  async (req: Request<{}, {}, ContactRequestBody>, res: Response) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {

      // Create transporter using test account
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: "nat.deckow@ethereal.email",
          pass: "4JJZP3fQzEC5PfvpqX",
        },
      });

      // Send email to your real inbox
      const info = await transporter.sendMail({
        from: `"${name}" <nat.deckow@ethereal.email>`, 
        to: "helpjohn@gmail.com", 
        subject: `Contact Form Message from ${name}`,
        text: message,
        html: `<p>${message}</p>`,
      });

      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));

      res.status(200).json({
        message: "Email sent successfully (test sender)",
        previewURL: nodemailer.getTestMessageUrl(info),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send email" });
    }
  }
);
export default ContactRouter;
