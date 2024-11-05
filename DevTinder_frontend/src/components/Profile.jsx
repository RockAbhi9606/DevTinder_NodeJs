import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-100 w-[500px] shadow-xl">
        <figure className="">
          <img
            className="h-[300px] w-[300px] rounded-full"
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <div className="">
            <label className="block my-1">FirstName:</label>
            <input
              type="text"
              placeholder="Enter your first name"
              className="input input-bordered input-accent w-full"
            />
          </div>

          <div className="">
            <label className="block my-1">LastName:</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="input input-bordered input-accent w-full"
            />
          </div>

          <div className="flex items-center">
            <div className="">
              <label className="block my-1">Age:</label>
              <input
                type="text"
                placeholder="Enter your age"
                className="input input-bordered input-accent w-full"
              />
            </div>
            <div className="flex items-center gap-4 ml-4 pt-6">
              <label className="block my-1">Gender:</label>
              <div className="dropdown dropdown-right dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1 w-32">
                  Male
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>male</a>
                  </li>
                  <li>
                    <a>female</a>
                  </li>
                  <li>
                    <a>others</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <textarea className="textarea textarea-bordered mt-5" placeholder="Add about yourself..."></textarea>

          <div className="card-actions justify-end">
            <button className="btn btn-primary text-white font-bold w-full my-4 text-xl">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
