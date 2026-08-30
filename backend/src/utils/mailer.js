import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn(
      "Mailer: SMTP settings missing in .env — notification emails will be skipped."
    );
    return null;
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: Number(SMTP_PORT) === 465, // true for port 465, false for 587/other
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  return transporter;
}

/**
 * Sends a notification email to the admin inbox.
 * Never throws — a failed email should never break the API request
 * that created the applicant/inquiry/etc.
 */
export async function sendAdminNotification({ subject, html, replyTo }) {
  try {
    const activeTransporter = getTransporter();

    if (!activeTransporter) return;

    const from = process.env.MAIL_FROM || process.env.SMTP_USER;
    const to = process.env.MAIL_TO || "info@smcqa.com";

    await activeTransporter.sendMail({
      from: `"SMCQA Website" <${from}>`,
      to,
      replyTo,
      subject,
      html,
    });

    console.log(`Notification email sent: "${subject}" -> ${to}`);
  } catch (error) {
    console.error("Mailer error (email not sent):", error.message);
  }
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderRows(fields) {
  return fields
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;font-weight:600;background:#f5f5f5;border:1px solid #e0e0e0;white-space:nowrap;">${escapeHtml(
            label
          )}</td>
          <td style="padding:8px 12px;border:1px solid #e0e0e0;">${escapeHtml(
            value
          )}</td>
        </tr>`
    )
    .join("");
}

/** Email for a new job application (Careers page). */
export function notifyNewApplicant(applicant) {
  const html = `
    <h2>New Job Application</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      ${renderRows([
        ["Job Title", applicant.jobTitle],
        ["Applicant Name", applicant.name],
        ["Email", applicant.email],
        ["Phone", applicant.phone],
        ["Message", applicant.message],
      ])}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#777;">
      Submitted via the Careers page on smcqa.com. View it in the admin panel under Applicants.
    </p>
  `;

  return sendAdminNotification({
    subject: `New Job Application: ${applicant.jobTitle || "Position"} — ${applicant.name || ""}`,
    html,
    replyTo: applicant.email,
  });
}

/** Email for a new contact/enquiry form submission (Contact page & Home enquiry form). */
export function notifyNewInquiry(inquiry) {
  const html = `
    <h2>New Enquiry</h2>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      ${renderRows([
        ["Name", inquiry.name],
        ["Email", inquiry.email],
        ["Phone", inquiry.phone],
        ["Subject", inquiry.subject],
        ["Message", inquiry.message],
      ])}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#777;">
      Submitted via the website enquiry/contact form. View it in the admin panel under Inquiries.
    </p>
  `;

  return sendAdminNotification({
    subject: `New Enquiry: ${inquiry.subject || "Website Contact Form"} — ${inquiry.name || ""}`,
    html,
    replyTo: inquiry.email,
  });
}