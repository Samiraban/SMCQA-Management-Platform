import Event from '../models/Event.js';

// CREATE EVENT (protected)
export const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, location, coverImage } = req.body;

    if (!title || !description || !eventDate) {
      return res.status(400).json({
        success: false,
        message: 'Title, description and eventDate are required.',
      });
    }

    const event = await Event.create({
      title,
      description,
      eventDate,
      location,
      coverImage,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: 'Event created successfully.',
      data: event,
    });
  } catch (error) {
    console.error('Create event error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while creating event.',
    });
  }
};

// GET ALL EVENTS (public, optional ?filter=upcoming|past)
export const getEvents = async (req, res) => {
  try {
    const { filter } = req.query;

    let query = {};
    const now = new Date();

    if (filter === 'upcoming') {
      query.eventDate = { $gte: now };
    } else if (filter === 'past') {
      query.eventDate = { $lt: now };
    }

    const events = await Event.find(query)
      .sort({ eventDate: filter === 'past' ? -1 : 1 })
      .populate('createdBy', 'name email');

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error('Get events error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching events.',
    });
  }
};

// GET SINGLE EVENT BY ID (public)
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Get event error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching event.',
    });
  }
};

// UPDATE EVENT (protected — creator or admin only)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    const isOwner = event.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this event.',
      });
    }

    const { title, description, eventDate, location, coverImage } = req.body;

    if (title) event.title = title;
    if (description) event.description = description;
    if (eventDate) event.eventDate = eventDate;
    if (location !== undefined) event.location = location;
    if (coverImage !== undefined) event.coverImage = coverImage;

    await event.save();

    return res.status(200).json({
      success: true,
      message: 'Event updated successfully.',
      data: event,
    });
  } catch (error) {
    console.error('Update event error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while updating event.',
    });
  }
};

// DELETE EVENT (protected — creator or admin only)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found.',
      });
    }

    const isOwner = event.createdBy.toString() === req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this event.',
      });
    }

    await event.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Event deleted successfully.',
    });
  } catch (error) {
    console.error('Delete event error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error while deleting event.',
    });
  }
};