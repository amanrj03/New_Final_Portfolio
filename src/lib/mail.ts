import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // Gmail App Password
  },
});

export async function sendContactMail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO ?? process.env.MAIL_USER,
    replyTo: data.email,
    subject: `[Contact] ${data.subject}`,
    html: `
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      <p><strong>Subject:</strong> ${data.subject}</p>
      <hr/>
      <p>${data.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}
