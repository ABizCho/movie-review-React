const { Schema } = require("mongoose");
const shortId = require("./type/short-id");

module.exports = new Schema(
  {
    shortId,
    title: String,
    content: String,
    img: String,
    email: String,
    author: {
      // post에 유저 정보를 담아 생성
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
