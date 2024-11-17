import * as Yup from "yup";

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please Enter Your FirstName"),
    lastName: Yup.string().min(2).max(25).required("Please Enter Your LastName"),
    gender: Yup.string().required("Please Enter Your Gender"),
    age: Yup.string().required("Please Enter Your age"),
    email: Yup.string().email().required("Please Enter Your Email"),
    password: Yup.string().min(8).required("Please Enter Your Password"),
    confirm_password: Yup.string().required().oneOf([Yup.ref("password"), null], "Password Must Match"),
    skills: Yup.string().required("Please Enter your skills"),
    about: Yup.string().required("Please Add About YourSelf")
})