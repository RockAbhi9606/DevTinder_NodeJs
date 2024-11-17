import axios from "axios";
import { BASE_URL, DUMMY_IMG } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeFeedFromList } from "../store/feedSlice";

const UserCard = ({ feed }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, about, age, gender, skills, photoUrl } =
    feed;
  const handleFeedData = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeedFromList(userId));
  };

  return (
    <div className="card bg-base-300 w-96 shadow-2xl h-[550px] rounded-lg transform transition duration-500 hover:scale-105">
      <figure className="px-5 pt-5">
        <img
          src={photoUrl || DUMMY_IMG}
          alt="User Photo"
          className="rounded-full w-48 h-48 object-cover border-4 border-secondary shadow-md"
        />
      </figure>
      <div className="card-body items-center text-center space-y-3">
        <h2 className="card-title text-white font-bold text-3xl">
          {firstName} {lastName}
        </h2>
        <p className="text-white font-medium text-lg">
          {age} years, {gender}
        </p>
        <p className="text-gray-300 font-light">{about}</p>
        {skills && (
          <p className="text-white font-medium text-sm">
            Skills: {skills.join(", ")}
          </p>
        )}
        <div className="card-actions mt-5 space-x-3">
          <button
            className="btn btn-primary font-bold text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700"
            onClick={() => handleFeedData("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary font-bold text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-700"
            onClick={() => handleFeedData("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
