import User from '../models/User.js';
import Article from '../models/Article.js';
import Contact from '../models/Contact.js';
import Event from '../models/Event.js';
import Gallery from '../models/Gallery.js';

// GET DASHBOARD STATS (admin only)
export const getDashboardStats = async (req, res) => {
  try {
    const [userCount, articleCount, contactCount, eventCount, galleryCount, unreadContacts] =
      await Promise.all([
        User.countDocuments(),
        Article.countDocuments(),
        Contact.countDocuments(),
        Event.countDocuments(),
        Gallery.countDocuments(),
        Contact.countDocuments({ isRead: false }),
      ]);

    return res.status(200).json({
      success: true,
      data: {
        users: userCount,
        articles: articleCount,
        contacts: contactCount,
        events: eventCount,
        galleryItems: galleryCount,
        unreadContacts,
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard stats.',
    });
  }
};

// GET ALL USERS (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Get all users error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching users.',
    });
  }
};