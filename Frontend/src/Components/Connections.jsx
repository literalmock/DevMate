import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BASE_URL + "/user/connections", {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(addConnections(res.data.connections));
      })
      .catch((err) => {
        console.error("Connections fetch error:", err);
      });
  }, []);

  if (!connections?.length) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        No Connections Yet
      </div>
    );
  }

  return (
    <div className="flex flex-col items-left gap-4 mt-8">
      {connections.map((user) => (
        <div
          key={user._id}
          className="flex items-center gap-4 w-[420px] bg-base-100 p-3 rounded-xl shadow-md hover:shadow-lg transition"
        >
          {/* Profile Image */}
          <img
            src={user.photoURL}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />

          {/* User Info */}
          <div className="flex-1">
            <h2 className="font-semibold">
              {user.name}, {user.age}
            </h2>

            <div className="flex gap-1 mt-1">
              {user.skills?.slice(0, 3).map((skill, i) => (
                <span key={i} className="badge badge-outline whitespace-nowrap">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button className="btn btn-sm btn-outline">Profile</button>
            <button className="btn btn-sm btn-primary">Message</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Connections;