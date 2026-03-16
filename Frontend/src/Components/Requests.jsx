import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          import.meta.env.VITE_BASE_URL + "/user/requests/received",
          { withCredentials: true }
        );
        dispatch(addRequests(res.data.data));
      } catch (err) {
        console.error("Requests fetch error:", err);
      }
    };

    fetchRequests();
  }, [dispatch]);

  const handleAction = async (status, requestId) => {
    try {
      await axios.post(
        import.meta.env.VITE_BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );

      // remove request from UI after action
      const updatedRequests = requests.filter((req) => req._id !== requestId);
      dispatch(addRequests(updatedRequests));

    } catch (err) {
      console.error("Action error:", err);
    }
  };

  if (!requests?.length) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-base-content">
        No Requests Yet
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-10 gap-6 text-base-content">
      <h1 className="text-2xl font-bold">Connection Requests</h1>

      {requests.map((req) => (
        <div
          key={req._id}
          className="flex items-center gap-6 bg-base-100 border border-base-300 shadow-md p-4 rounded-xl w-[400px]"
        >
          <img
            src={req.photoURL || "https://api.dicebear.com/9.x/initials/svg?seed=" + encodeURIComponent(req.name || "User")}
            alt={req.name || "avatar"}
            className="w-16 h-16 rounded-full object-cover"
          />

          <div className="flex-1">
            <h2 className="font-semibold text-base-content">{req.name}</h2>
            <p className="text-sm text-base-content/70">{req.about || "No bio added yet"}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleAction("accepted", req._id)}
              className="btn btn-success btn-sm text-white"
            >
              Accept
            </button>

            <button
              onClick={() => handleAction("rejected", req._id)}
              className="btn btn-error btn-sm text-white"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Requests;