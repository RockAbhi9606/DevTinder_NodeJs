import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL, DUMMY_IMG } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/connectionsSlice";

const Connections = () => {
  const userConnections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "client/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!userConnections) return null;

  if (userConnections.length === 0)
    return (
      <h1 className="text-center text-3xl py-8 font-semibold text-white">
        No Connections Found
      </h1>
    );

  return (
    <>
      <h1 className="text-center text-white text-3xl py-8">Connections</h1>
      <div className="py-8 px-8 flex gap-8 flex-wrap flex-col">
        {userConnections.map((connection) => {
          const {
            _id,
            photoUrl = DUMMY_IMG,
            firstName = "Unknown",
            lastName = "User",
            age = "N/A",
            gender = "Not specified",
            about = "No information available",
            skills = [],
          } = connection || {};

          return (
            <div
              key={_id}
              className="flex justify-between items-center bg-base-300 w-1/2 mx-auto m-5 p-5 rounded-lg"
            >
              <div>
                <img
                  className="w-20 h-20 rounded-full"
                  src={photoUrl || DUMMY_IMG}
                  alt={`${firstName} ${lastName} image`}
                />
              </div>
              <div className="text-white">
                <span className="font-bold text-2xl text-white">
                  {firstName + " " + lastName}
                </span>
                <p>
                  {age} , {gender}
                </p>
                <p>
                  <span className="font-bold italic">About:</span> {about}
                </p>
                <p>
                  <span className="font-bold italic">Skills:</span>{" "}
                  {skills.length > 0 ? skills.join(", ") : "No skills provided"}
                </p>
              </div>
              <div>
                <button className="btn btn-accent text-white font-bold">
                  Message
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
