import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL, DUMMY_IMG } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../store/requestsSlice";

const Requests = () => {
  const pendingRequests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "client/requests/pending", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequests = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/review/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!pendingRequests) return;

  if (pendingRequests.length <= 0)
    return (
      <h1 className="text-center text-3xl py-8 font-semibold text-white">
        No Requests Pendings
      </h1>
    );

  return (
    <>
      <h1 className="text-center text-3xl py-8 text-white font-semibold">
        Pending Requests
      </h1>
      <div className="py-8 px-8 flex gap-8 flex-wrap">
        {pendingRequests.map((request) => {
          const { photoUrl, firstName, lastName, age, gender, about, skills } =
            request?.fromUserId || {};
          return (
            <div
              key={request._id}
              className="flex justify-between items-center bg-base-300 w-1/2 mx-auto m-5 p-5 rounded-lg"
            >
              <div>
                <img
                  className="w-20 h-20 rounded-full"
                  src={photoUrl || DUMMY_IMG}
                  alt={`${firstName} image`}
                />
              </div>
              <div className="text-white">
                <span className="font-bold text-2xl text-white">
                  {" "}
                  {firstName + " " + lastName}
                </span>
                <p>
                  {" "}
                  {age} , {gender}
                </p>
                <p>
                  <span className="font-bold italic">About:</span> {about}
                </p>
                <p>
                  <span className="font-bold italic">Skills:</span>{" "}
                  {skills ? skills.join(", ") : "No skills provided"}
                </p>
              </div>
              <div className="card-actions mt-5 space-x-3">
                <button
                  className="btn btn-error font-bold text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-500"
                  onClick={() => reviewRequests("rejected", request._id)}
                >
                  Rejected
                </button>
                <button
                  className="btn btn-accent font-bold text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-500"
                  onClick={() => reviewRequests("accepted", request._id)}
                >
                  Accepeted
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Requests;
