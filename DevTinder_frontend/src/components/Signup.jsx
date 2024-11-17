import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpSchema } from "../utils/validation";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  age: "",
  email: "",
  password: "",
  confirm_password: "",
  photoUrl: "",
  skills: [],
  about: "",
};

const Signup = () => {
  const [toast, setToast] = useState(false);
  //const navigate = useNavigate();
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        try {
          await axios.post(BASE_URL + "signup", values, {
            withCredentials: true,
          });
          setToast(true);
          setTimeout(() => {
            setToast(false);
          }, 3000);
          action.resetForm();
          // navigate("/login");
        } catch (err) {
          console.log(err);
        }
      },
    });

  // Custom handler for skills input to split the input string into an array
  const handleSkillsChange = (e) => {
    const skillString = e.target.value;
    const skillArray = skillString.split(",").map((skill) => skill.trim());
    setFieldValue("skills", skillArray);
  };

  return (
    <div className="flex flex-col justify-center lg:flex-row items-center gap-11 pb-8 lg:justify-center bg-gray-900 min-h-screen">
      <div className="card bg-gray-800 w-full max-w-2xl shadow-2xl mb-8 rounded-lg p-6">
        <h2 className="card-title self-center text-2xl font-bold text-white mb-5">
          SignUp Details
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            <div>
              <label htmlFor="firstName" className="text-white font-semibold">
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter first name"
                className="input input-bordered w-full text-white"
              />
              {errors.firstName && touched.firstName ? (
                <p className="text-red-500 text-xs px-4 py-1">
                  {errors.firstName}
                  {/* Firstname must be between 3 and 20 characters. */}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="lastName" className="text-white font-semibold">
                Last Name*
              </label>
              <input
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter last name"
                className="input input-bordered w-full text-white"
              />
              {errors.lastName && touched.lastName ? (
                <p className="text-red-500 text-xs px-4 py-1">
                  {errors.lastName}
                  {/* Lastname must be between 3 and 20 characters. */}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="gender" className="text-white font-semibold">
                Gender*
              </label>
              <select
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                id="gender"
                className="select select-bordered w-full text-white"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && touched.gender ? (
                <p className="text-red-500 text-xs px-4 py-1">
                  {errors.gender}
                  {/* Lastname must be between 3 and 20 characters. */}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor="age" className="text-white font-semibold">
                Age*
              </label>
              <input
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter age"
                className="input input-bordered w-full text-white"
              />
              {errors.age && touched.age ? (
                <p className="text-red-500 text-xs px-4 py-1">{errors.age}</p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="text-white font-semibold">
              Email Address*
            </label>
            <input
              type="text"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter Your Email Adress"
              className="input input-bordered w-full text-white"
            />
            {errors.email && touched.email ? (
              <p className="text-red-500 text-xs px-4 py-1">
                {errors.email}
                {/* Please enter a valid email address (e.g., name@example.com). */}
              </p>
            ) : null}
          </div>

          <div className="flex justify-between gap-4">
            <div className="w-full">
              <label htmlFor="photoUrl" className="text-white font-semibold">
                Password*
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your Password"
                className="input input-bordered w-full text-white"
              />
              {errors.password && touched.password ? (
                <p className="text-red-500 text-xs px-4 py-1">
                  {errors.password}
                  {/* Password must contain at least 8 characters, including one
                  uppercase letter, one number, and one special character. */}
                </p>
              ) : null}
            </div>

            <div className="w-full">
              <label htmlFor="confirm_password" className="text-white font-semibold">
                Confirm Password*
              </label>
              <input
                type="password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your Password"
                className="input input-bordered w-full text-white"
              />
              {errors.confirm_password && touched.confirm_password ? (
                <p className="text-red-500 text-xs px-4 py-1">
                  {errors.confirm_password}
                  {/* Passwords must match. Please check and try again */}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label htmlFor="photoUrl" className="text-white font-semibold">
              Photo URL
            </label>
            <input
              type="text"
              name="photoUrl"
              value={values.photoUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter photo URL"
              className="input input-bordered w-full text-white"
            />
          </div>

          <div>
            <label htmlFor="skills" className="text-white font-semibold">
              Skills*
            </label>
            <input
              type="text"
              name="skills"
              value={values.skills}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter skills separated by commas"
              className="input input-bordered w-full text-white"
            />
            {errors.skills && touched.skills ? (
              <p className="text-red-500 text-xs px-4 py-1">{errors.skills}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="about" className="text-white font-semibold">
              About*
            </label>
            <textarea
              placeholder="Add about yourself"
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
              className="textarea textarea-bordered w-full text-white"
            ></textarea>
            {errors.about && touched.about ? (
              <p className="text-red-500 text-xs px-4 py-1">
                {errors.about}
                {/* Please provide a description between 50 and 500 characters. */}
              </p>
            ) : null}
          </div>
          <p className="text-red-500 text-center"></p>
          <div className="card-actions justify-center">
            <button
              type="submit"
              className="btn btn-primary w-full font-bold text-white hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Sign Up
            </button>

            <p className="text-sm text-center text-white">
              Already an account?
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-center fixed top-5 left-1/2 transform -translate-x-1/2">
          <div className="alert alert-success">
            <span className="text-white font-bold">
              User Added successfully!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
