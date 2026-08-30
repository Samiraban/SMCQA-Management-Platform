import Gallery from '../models/Gallery.js';

// UPLOAD/CREATE GALLERY ITEM (protected)
export const createGalleryItem = async (req, res) => {
  try {
    const { title, imageUrl, category } = req.body;

    if (!title || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and imageUrl are required.',
      });
    }

    const item = await Gallery.create({
      title,
      imageUrl,
      category,
      uploadedBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Gallery item added successfully.',
      data: item,
    });
  } catch (error) {
    console.error('Create gallery item error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while adding gallery item.',
    });
  }
};

// GET ALL GALLERY ITEMS (public, optional category filter)
export const getGalleryItems = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const items = await Gallery.find(filter)
      .sort({ createdAt: -1 })
      .populate('uploadedBy', 'name email');

    return res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Get gallery items error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching gallery items.',
    });
  }
};

// DELETE GALLERY ITEM (protected — uploader or admin only)
export const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found.',
      });
    }

    const isOwner = item.uploadedBy.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this item.',
      });
    }

    await item.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully.',
    });
  } catch (error) {
    console.error('Delete gallery item error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting gallery item.',
    });
  }
};