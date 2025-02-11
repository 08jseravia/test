import nodemailer from "nodemailer";

// Define the email options type
interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Create a transporter using custom SMTP settings
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server host (e.g., smtp.example.com)
  port: parseInt(process.env.SMTP_PORT || "587"), // SMTP port (e.g., 587 for TLS)
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // Your email address (e.g., reservaciones@margaritavilleresorts.com.mx)
    pass: process.env.SMTP_PASSWORD, // Your email password
  },
});

// Function to send an email
export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}: EmailOptions): Promise<void> => {
  const mailOptions = {
    from: `Reservaciones <${process.env.SMTP_USER}>`, // Sender address
    to, // Recipient address
    subject, // Email subject
    text, // Plain text body
    html, // HTML body (optional)
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
