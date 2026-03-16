import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import React from "react";

const TinderCard = ({ user, onSwipe , swipeable }) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-300, 300], [-25, 25]);
  const opacity = useTransform(x, [-300, 0, 300], [0, 1, 0]);

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 120;
    const velocity = info.velocity.x;

    // swipe right
    if (info.offset.x > swipeThreshold || velocity > 500) {
      animate(x, 600, { duration: 0.3 });
      onSwipe("right", user);
    }

    // swipe left
    else if (info.offset.x < -swipeThreshold || velocity < -500) {
      animate(x, -600, { duration: 0.3 });
      onSwipe("left", user);
    }

    // reset position
    else {
      animate(x, 0, { type: "spring", stiffness: 300 });
    }
  };

  const firstName = user?.name?.split(" ")[0];

  return (
    <motion.div
    drag={swipeable ? "x" : false}
  onDragEnd={swipeable ? handleDragEnd : undefined}
  style={{ x, rotate, opacity }}
  dragConstraints={{ left: 0, right: 0 }}
  // className="absolute w-[90vw] max-w-[420px] h-[75vh] bg-base-100 rounded-3xl shadow-2xl overflow-hidden"
      dragElastic={0.8}
      whileTap={{ cursor: "grabbing" }}
      className="absolute w-[90vw] max-w-[420px] h-[75vh] bg-base-100 rounded-3xl shadow-2xl overflow-hidden cursor-grab select-none"
    >
      {/* IMAGE */}
      <img
        src={user.photoURL}
        alt={user.name}
        className="h-full w-full object-cover pointer-events-none"
      />

      {/* GRADIENT OVERLAY */}
      <div className="absolute bottom-0 left-0 w-full p-5 bg-gradient-to-t from-black/80 to-transparent text-white">
        <h2 className="text-2xl font-bold">
          {firstName}, {user.age}
        </h2>

        <p className="capitalize opacity-80">{user.gender}</p>

        <p className="text-sm mt-1">{user.about}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {user.skills?.map((skill, i) => (
            <span
              key={i}
              className="badge badge-outline text-white border-white"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TinderCard;