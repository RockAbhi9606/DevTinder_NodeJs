// eslint-disable-next-line react/prop-types
const UserCard = ({ feed }) => {
  const { firstName, lastName, about, age, gender, skills, photoUrl } = feed;
  console.log(feed);
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="px-5 pt-5">
        <img
          src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-white font-bold text-3xl">
          {firstName + " " + lastName}
        </h2>
        <p className="text-white font-semibold">{age + ", " + gender}</p>
        <p className="text-white font-semibold">{about}</p>
        <div className="card-actions my-5">
          <button className="btn btn-primary font-bold text-white">
            Ignore
          </button>
          <button className="btn btn-secondary font-bold text-white">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
