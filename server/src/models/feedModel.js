import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
  image: { type: String, required: true },
  caption: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

const feedModel = mongoose.model.feed || mongoose.model("feed", feedSchema);

export default feedModel;
