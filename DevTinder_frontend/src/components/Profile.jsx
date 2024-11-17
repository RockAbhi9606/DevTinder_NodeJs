import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const [userData, setUserData] = useState(
    user || JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  console.log("userData", userData);

  return (
    <>
      <EditProfile user={{...userData,...user}} />
    </>
  );
};

export default Profile;
