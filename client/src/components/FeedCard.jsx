import React from "react";
import { assets } from "../assets/assets";

const FeedCard = ({ feed }) => {
  return (
    <div className="bg-gray-100 p-4 mb-4 rounded shadow">
      <div className="d-flex mb-3">
        <img
          src={assets.user_profile}
          className="rounded-circle me-2"
          height="25"
          alt="profile"
          loading="lazy"
        />
        <b>{feed.userId?.name || "Anonymous"}</b>
      </div>
      <div>
        <img
          src={feed.image}
          alt="Feed"
          className="img-thumbnail h-64 object-cover mb-2 rounded mx-auto d-block"
        />

        <p>{feed.caption}</p>
      </div>
    </div>
  );
};

export default FeedCard;
