import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../store/userSlice";
import axios from "axios";
import UserCard from "./UserCard";
const EditProfile = ({ user }) => {
  console.log("user", user);
  const [firstname, setFirstname] = useState(user?.firstName || "");
  const [lastname, setLastname] = useState(user?.lastName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoUrl || "");
  const [userAge, setUserAge] = useState(user?.age || 0);
  const [userGender, setUserGender] = useState(user?.gender || "");
  const [aboutUser, setAboutUser] = useState(user?.about || "");
  const [userSkills, setUserSkills] = useState(user?.skills || "");
  const [toast, setToast] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleSave = async () => {
    try {
      setError("");
      const res = await axios.patch(
        `${BASE_URL}profile/edit/`,
        {
          firstName: firstname,
          lastName: lastname,
          photoUrl: photoURL,
          age: userAge,
          gender: userGender,
          about: aboutUser,
          skills: userSkills,
        },
        { withCredentials: true }
      );
      debugger;
      dispatch(addUser(res?.data?.data));
      debugger;
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(err?.response?.data || "An error occurred. Please try again.");
      console.log(err);
    }
  };
  return user ? (
    <div className="flex flex-col justify-center lg:flex-row items-center gap-11 pb-8 lg:justify-center bg-gray-900 min-h-screen">
      <div className="card bg-gray-800 w-full max-w-lg shadow-2xl mb-8 rounded-lg p-6">
        <h2 className="card-title self-center text-2xl font-bold text-white mb-5">
          Edit Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="firstname" className="text-white font-semibold">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="input input-bordered w-full text-white"
            />
          </div>
          <div>
            <label htmlFor="lastname" className="text-white font-semibold">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="input input-bordered w-full text-white"
            />
          </div>
          <div>
            <label htmlFor="photoUrl" className="text-white font-semibold">
              Photo URL
            </label>
            <input
              type="text"
              placeholder="Enter photo URL"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              className="input input-bordered w-full text-white"
            />
          </div>
          <div>
            <label htmlFor="age" className="text-white font-semibold">
              Age
            </label>
            <input
              type="number"
              placeholder="Enter age"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              className="input input-bordered w-full text-white"
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-white font-semibold">
              Gender
            </label>
            <select
              value={userGender}
              onChange={(e) => setUserGender(e.target.value)}
              className="select select-bordered w-full text-white"
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="skills" className="text-white font-semibold">
              Skills
            </label>
            <input
              type="text"
              placeholder="Enter skills separated by commas"
              value={userSkills}
              onChange={(e) => setUserSkills(e.target.value)}
              className="input input-bordered w-full text-white"
            />
          </div>
          <div>
            <label htmlFor="about" className="text-white font-semibold">
              About
            </label>
            <textarea
              placeholder="Add about yourself"
              value={aboutUser}
              onChange={(e) => setAboutUser(e.target.value)}
              className="textarea textarea-bordered w-full text-white"
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary w-full font-bold text-white hover:bg-blue-700"
              onClick={handleSave}
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <UserCard feed={user} />

      {toast && (
        <div className="toast toast-top toast-center fixed top-5 left-1/2 transform -translate-x-1/2">
          <div className="alert alert-success">
            <span className="text-white font-bold">
              Profile updated successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-white text-center p-8">Loading...</div>
  );
};
export default EditProfile;
