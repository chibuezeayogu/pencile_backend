import { Schema, model } from "mongoose";

const Topic = model(
  "Topic",
  new Schema({
    _id: {
      type: String,
      lowercase: true,
      require: [true, "Topic is required"],
    },
    children: [
      {
        type: String,
        index: true,
        lowercase: true,
        default: [],
      },
    ],
  })
);

export default Topic;
