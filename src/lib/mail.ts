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
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Contact Message</title>
</head>
<body style="margin:0;padding:0;background-color:#0f0f0f;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f0f0f;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid #2a2a2a;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:2px;text-transform:uppercase;">Portfolio</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;">New Message Received</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">

              <!-- Sender info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#242424;border-radius:8px;overflow:hidden;margin-bottom:24px;border:1px solid #2e2e2e;">
                <tr>
                  <td style="padding:20px 24px;border-bottom:1px solid #2e2e2e;">
                    <p style="margin:0 0 4px 0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">From</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#f3f4f6;">${data.name}</p>
                    <a href="mailto:${data.email}" style="font-size:13px;color:#818cf8;text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 4px 0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Subject</p>
                    <p style="margin:0;font-size:15px;font-weight:500;color:#f3f4f6;">${data.subject}</p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 12px 0;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;">Message</p>
              <div style="background-color:#242424;border-radius:8px;padding:24px;border:1px solid #2e2e2e;border-left:3px solid #6366f1;">
                <p style="margin:0;font-size:15px;line-height:1.7;color:#d1d5db;">${data.message.replace(/\n/g, "<br/>")}</p>
              </div>

              <!-- Reply CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}"
                       style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;letter-spacing:0.5px;">
                      Reply to ${data.name}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;font-size:12px;color:#4b5563;">This message was sent via your portfolio contact form.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO ?? process.env.MAIL_USER,
    replyTo: data.email,
    subject: `[Contact] ${data.subject}`,
    html,
  });
}
