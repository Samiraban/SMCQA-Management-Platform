import Article from '../models/Article.js';

// Helper: generate a URL-friendly slug from the title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

// CREATE ARTICLE (protected — logged-in users only)
export const createArticle = async (req, res) => {
  try {
    const { title, content, excerpt, coverImage, isPublished } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required.',
      });
    }

    let slug = generateSlug(title);

    const existingSlug = await Article.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    const article = await Article.create({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      isPublished: isPublished || false,
      author: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      data: article,
    });
  } catch (error) {
    console.error('Create article error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while creating article.',
    });
  }
};

// GET ALL PUBLISHED ARTICLES (public)
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate('author', 'name email');

    return res.status(200).json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    console.error('Get articles error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching articles.',
    });
  }
};

// GET SINGLE ARTICLE BY SLUG (public)
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({
      slug: req.params.slug,
    }).populate('author', 'name email');

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    console.error('Get article error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching article.',
    });
  }
};

// UPDATE ARTICLE (protected — author or admin only)
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found.',
      });
    }

    const isOwner = article.author.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this article.',
      });
    }

    const { title, content, excerpt, coverImage, isPublished } = req.body;

    if (title) {
      article.title = title;
      article.slug = generateSlug(title);
    }
    if (content) article.content = content;
    if (excerpt !== undefined) article.excerpt = excerpt;
    if (coverImage !== undefined) article.coverImage = coverImage;
    if (isPublished !== undefined) article.isPublished = isPublished;

    await article.save();

    return res.status(200).json({
      success: true,
      message: 'Article updated successfully.',
      data: article,
    });
  } catch (error) {
    console.error('Update article error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while updating article.',
    });
  }
};

// DELETE ARTICLE (protected — author or admin only)
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found.',
      });
    }

    const isOwner = article.author.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this article.',
      });
    }

    await article.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error) {
    console.error('Delete article error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting article.',
    });
  }
};