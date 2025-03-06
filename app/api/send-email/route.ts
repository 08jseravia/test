import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Create a transporter using custom SMTP settings
const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVER,
  host: process.env.SMTP_HOST, // SMTP server host (e.g., smtp.gmail.com)
  port: parseInt(process.env.SMTP_PORT || "587"), // SMTP port (e.g., 587 for TLS)
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email address
    pass: process.env.SMTP_PASSWORD, // Your email password
  },
});

export async function POST(request: Request) {
  try {
    const { to, subject, text, html } = await request.json();

    const mailOptions = {
      from: `Reservaciones <${process.env.SMTP_USER}>`, // Sender address
      to, // Recipient address
      subject, // Email subject
      text, // Plain text body
      html, // HTML body (optional)
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Failed to send email: ${error}` },
      { status: 500 }
    );
  }
}
