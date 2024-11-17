import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feedData) return;
    try {
      const res = await axios.get(BASE_URL + "feed", { withCredentials: true });
      console.log(res);
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feedData) return;

  if (feedData.length <= 0)
    return (
      <h1 className="text-center my-8 text-2xl text-white font-bold">
        No New User Found!
      </h1>
    );
  return (
    feedData && (
      <div className="flex justify-center my-12">
        <UserCard feed={feedData[0]} />
      </div>
    )
  );
};

export default Feed;
