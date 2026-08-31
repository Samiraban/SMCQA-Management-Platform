import { sendReplyEmail } from "../utils/mailer.js";

// POST /api/mailer/reply  (admin only)
// Sends a direct email FROM the company TO a customer/applicant —
// used by the admin panel's "Reply" button on Inquiries/Applicants.
export const replyByEmail = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Recipient email, subject and message are required.",
      });
    }

    const result = await sendReplyEmail({ to, subject, message });

    if (!result.sent) {
      return res.status(502).json({
        success: false,
        message:
          result.reason ||
          "Email could not be sent. Check the SMTP settings on the server.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("Reply email error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while sending the email.",
    });
  }
};