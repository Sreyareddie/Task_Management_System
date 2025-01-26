import React, { useState, useEffect, useMemo } from "react";
import API from "../api";
import FeedCard from "./FeedCard";
import AddFeed from "./AddFeed";

const Feed = () => {
  const [feeds, setFeeds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  const sortedFeeds = useMemo(() => {
    return [...feeds].sort((a, b) => b._id.localeCompare(a._id));
  }, [feeds]);

  const fetchFeeds = async () => {
    try {
      const response = await API.get("/feed/list", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setFeeds(response.data.feeds);
      } else {
        console.error("Failed to fetch feeds.");
      }
    } catch (error) {
      console.error("Error fetching feeds:", error);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  return (
    <div className="container position-relative">
      <h1 className="h3">Feed</h1>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-danger position-absolute top-0 end-0"
      >
        Add Post
      </button>

      {showModal && (
        <AddFeed
          showModal={showModal}
          setShowModal={setShowModal}
          token={token}
          onFeedAdded={fetchFeeds}
        />
      )}

      <div className="container col-md-6">
        {sortedFeeds && sortedFeeds.length > 0 ? (
          sortedFeeds.map((feed) => <FeedCard key={feed._id} feed={feed} />)
        ) : (
          <p>No feeds available</p>
        )}
      </div>
    </div>
  );
};

export default Feed;
