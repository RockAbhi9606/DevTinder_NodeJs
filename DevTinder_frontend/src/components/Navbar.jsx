import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, DUMMY_IMG } from "../utils/constant";
import { removeUser } from "../store/userSlice";
import { removeFeed } from "../store/feedSlice";
import { removeConnections } from "../store/connectionsSlice";
import { removeRequests } from "../store/requestsSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
      localStorage.removeItem("user");
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  //     try {
  //       const loggedInUser = await axios.get(BASE_URL + "profile/view", {
  //         withCredentials: true,
  //       });
  //       navigate("/profile");
  //     } catch (err) {
  //       console.error("Error fetching profile:", err);
  //     }
  //   };
  return (
    <>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Link to="/" className="ml-5 text-white font-bold text-xl">
            DevTinder
          </Link>
        </div>
        {user && (
          <div className="flex-none gap-2">
            <div className="form-control text-white font-bold">
              Welcome ,{user.firstName}
            </div>
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt={`${user.firstName} image`} src={user.photoUrl || DUMMY_IMG} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="connections">Connections</Link>
                </li>
                <li>
                  <Link to="requests">Requests pendings</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
