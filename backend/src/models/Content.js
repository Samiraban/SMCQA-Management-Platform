import mongoose from "mongoose";

const contentSchema =
  new mongoose.Schema(
    {
      collection: {
        type: String,
        required: true,
        index: true,
      },

      itemId: {
        type: String,
        required: true,
      },

      data: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

contentSchema.index(
  {
    collection: 1,
    itemId: 1,
  },
  {
    unique: true,
  }
);

const Content =
  mongoose.model(
    "Content",
    contentSchema
  );

export default Content;