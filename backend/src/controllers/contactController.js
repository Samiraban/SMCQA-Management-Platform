import Contact from '../models/Contact.js';

// SUBMIT CONTACT FORM
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message are required.',
      });
    }

    const contact = await Contact.create({
      name,
      email: email.toLowerCase(),
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully.',
      data: contact,
    });
  } catch (error) {
    console.error('Contact submit error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while submitting your message.',
    });
  }
};

// GET ALL CONTACTS (admin use, protected later)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error('Get contacts error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching messages.',
    });
  }
};