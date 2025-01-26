import { v2 as cloudinary } from "cloudinary";
import feedModel from "../models/feedModel.js";

const addFeed = async (request, response) => {
  try {
    const imageFile = request.file;
    const caption = request.body.caption;
    const userId = request.userId;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const feedData = {
      image: imageUpload.secure_url,
      caption,
      userId,
    };

    const feed = feedModel(feedData);
    await feed.save();

    response.json({ success: true, message: "Feed Post Added" });
  } catch (error) {
    response.json({ success: false });
  }
};

const listFeed = async (request, response) => {
  try {
    const feeds = await feedModel
      .find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });
    response.json({ success: true, feeds });
  } catch (error) {
    response.status(500).json({ success: false, error: error.message });
  }
};

const removeFeed = async (request, response) => {
  try {
    const userId = request.userId;
    await feedModel.findOneAndDelete({ _id: id, userId });
    response.json({ success: true, message: "Feed Post Removed" });
  } catch (error) {
    response.json({ success: false });
  }
};

export { addFeed, listFeed, removeFeed };
