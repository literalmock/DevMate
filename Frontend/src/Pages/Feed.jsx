import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import TinderCard from "../Components/TinderCard";
import {Skiper39} from "../Components/ui/skiper-ui/skiper39";
import { useRenderCount } from "@uidotdev/usehooks";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const [users, setUsers] = useState([]);
  // const [showAnimation, setShowAnimation] = useState(false);
  const [processingUserId, setProcessingUserId] = useState(null);
  // const renderCount = useRenderCount();
  // console.log("Feed Render Count:", renderCount);
  useEffect(() => {
    // If redux already has feed
    if (feed?.length) {
      setUsers(feed);
      return;
    }
    // setTimeout(() => {
    //   setShowAnimation(false);
    // }, 3000); //Hide animation after 5 seconds
    // Otherwise fetch/
    axios
      .get(import.meta.env.VITE_BASE_URL + "/user/feed", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(addFeed(res.data));
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Feed fetch error:", err);
      });
  }, []);

  const handleSwipe = async (direction, user) => {
    if (!user?._id || processingUserId) {
      return;
    }

    const status = direction === "right" ? "interested" : "ignore";
    setProcessingUserId(user._id);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/request/sent/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );

      setUsers((prev) => prev.filter((u) => u._id !== user._id));
      dispatch(removeUserFromFeed(user._id));

      if (direction === "right") {
        setShowAnimation(true);
        setTimeout(() => {
          setShowAnimation(false);
        }, 1200);
      }
    } catch (err) {
      console.error("Request send error:", err?.response?.data || err.message);
    } finally {
      setProcessingUserId(null);
    }
  };

  if (!users.length) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        No more users
      </div>
    );
  }

  return (
    <div>
    <div className="flex items-center justify-center h-screen relative bg-base-200">
      {users.map((user) => (
        <TinderCard
          key={user._id}
          user={user}
          onSwipe={handleSwipe}
          swipeable={true}
        />
      ))}
    </div>
    <div className="absolute right-40 top-1/2 -translate-y-1/2 flex flex-col gap-4">
  <button className="btn btn-success rounded-full w-16 h-16 text-xl" onClick={() => handleSwipe("right", users[users.length - 1])}>
    ❤️
  </button>

  <button className="btn btn-error rounded-full w-16 h-16 text-xl" onClick={() => handleSwipe("left", users[users.length - 1])}>
    ❌
  </button>
</div>
    </div> 
  );
};

export default Feed;