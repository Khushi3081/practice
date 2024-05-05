import * as yup from "yup";

export const registrationValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, "Must be alphanumeric")
    .required("Username name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, "Must be alphanumeric")
    .required("Username name is required"),
  email: yup
    .string()
    .email("Invalid Email")
    .required("Email field is required!"),
  password: yup.string().required("Password is required"),
});
