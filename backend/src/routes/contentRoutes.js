import express from "express";

import {
  getCollection,
  createCollectionItem,
  updateCollectionItem,
  deleteCollectionItem,
} from "../controllers/contentController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/*
=========================================================
PUBLIC GET COLLECTIONS
=========================================================

These collections can be read by the public website.
*/

const publicGetCollections = new Set([
  "services",
  "team",
  "clients",
  "jobs",
  "blog",
  "siteContent",
  "stats",
  "chats",
]);

/*
=========================================================
PUBLIC CREATE COLLECTIONS
=========================================================

Visitors are allowed to submit these.
*/

const publicCreateCollections = new Set([
  "inquiries",
  "applicants",
  "chats",
]);

/*
=========================================================
GET
=========================================================

Public:
GET /api/content/services
GET /api/content/team
GET /api/content/clients
GET /api/content/jobs
GET /api/content/blog
GET /api/content/siteContent
GET /api/content/stats
GET /api/content/chats

Admin:
Other collections require authentication.
*/

router.get("/:collection", async (req, res, next) => {
  try {
    const collection = req.params.collection;

    // PUBLIC COLLECTION
    if (publicGetCollections.has(collection)) {
      return getCollection(req, res);
    }

    // PROTECTED COLLECTION
    return protect(req, res, () => {
      return adminOnly(req, res, () => {
        return getCollection(req, res);
      });
    });
  } catch (error) {
    next(error);
  }
});

/*
=========================================================
POST
=========================================================

Public:
POST /api/content/inquiries
POST /api/content/applicants
POST /api/content/chats

Admin:
Everything else.
*/

router.post("/:collection", async (req, res, next) => {
  try {
    const collection = req.params.collection;

    // PUBLIC CREATE
    if (publicCreateCollections.has(collection)) {
      return createCollectionItem(req, res);
    }

    // PROTECTED CREATE
    return protect(req, res, () => {
      return adminOnly(req, res, () => {
        return createCollectionItem(req, res);
      });
    });
  } catch (error) {
    next(error);
  }
});

/*
=========================================================
PUT
=========================================================

Only authenticated admin can update.
*/

router.put(
  "/:collection/:id",
  protect,
  adminOnly,
  updateCollectionItem
);

/*
=========================================================
DELETE
=========================================================

Only authenticated admin can delete.
*/

router.delete(
  "/:collection/:id",
  protect,
  adminOnly,
  deleteCollectionItem
);

export default router;