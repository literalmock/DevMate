import { motion, useTransform } from "framer-motion";
import React from "react";

const StickyCard = ({ i, user, progress, range, targetScale }) => {

  const scale = useTransform(progress, range, [1, targetScale])
  const firstName = user?.name?.trim().split(" ")[0]

  return (
    <div className="sticky top-0 flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 20 + 250}px)`
        }}
        className="relative -top-1/4 flex h-[420px] w-[520px] origin-top flex-col overflow-hidden rounded-3xl bg-base-100 shadow-xl"
      >

        <div className="p-4 space-y-1 text-center">
          <h2 className="text-xl font-bold">
            {firstName}, {user.age}
          </h2>

          <p className="capitalize text-sm opacity-70">
            {user.gender}
          </p>

          <p className="text-sm">
            {user.about}
          </p>

          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {user.skills?.map((skill, index) => (
              <span key={index} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {user.photoURL && (
          <img
            src={user.photoURL}
            alt={user.name}
            className="h-full w-full object-cover"
          />
        )}
      </motion.div>
    </div>
  )
}

export default StickyCard;