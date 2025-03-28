const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    image: { type: String, required: true }, 
    type: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number },
    platform: { type: String, require: true },
    releasedDate: { type: Date },
    description: { type: String, require: true },
    discount: { type: Number, require: true },
    selled: { type: Number },
  },
  {
    timestamps: true,
  }
);
const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
