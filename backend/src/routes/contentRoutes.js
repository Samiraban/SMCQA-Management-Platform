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

const router =
  express.Router();

const publicGetCollections =
  new Set([
    "services",
    "team",
    "clients",
    "jobs",
    "blog",
    "siteContent",
    "stats",
  ]);

const publicCreateCollections =
  new Set([
    "inquiries",
    "applicants",
    "chats",
  ]);

router.get(
  "/:collection",
  (req, res, next) => {
    if (
      publicGetCollections.has(
        req.params.collection
      )
    ) {
      return getCollection(
        req,
        res
      );
    }

    return protect(
      req,
      res,
      () =>
        adminOnly(
          req,
          res,
          () =>
            getCollection(
              req,
              res
            )
        )
    );
  }
);

router.post(
  "/:collection",
  (req, res, next) => {
    if (
      publicCreateCollections.has(
        req.params.collection
      )
    ) {
      return createCollectionItem(
        req,
        res
      );
    }

    return protect(
      req,
      res,
      () =>
        adminOnly(
          req,
          res,
          () =>
            createCollectionItem(
              req,
              res
            )
        )
    );
  }
);

router.put(
  "/:collection/:id",
  protect,
  adminOnly,
  updateCollectionItem
);

router.delete(
  "/:collection/:id",
  protect,
  adminOnly,
  deleteCollectionItem
);

export default router;