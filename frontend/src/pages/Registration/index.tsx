import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userType } from "./types/registration.type";
import { registrationValidationSchema } from "./validation/registration.schema";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate()
  const [model,setModel] = useState(false)
  const [varient, setVarient] = useState("Customer");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userType>({
    defaultValues: {},
    resolver: yupResolver<userType>(registrationValidationSchema),
  });
  const handleSignUp = async(values: userType) => {
    const data = {
      ...values,
      varient
    }
    
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/addUserData`,data)
    if(response.status===200){
      if(varient==="Admin"){
        navigate("/login")
      }
      else{
        setModel(true)
      }
    }    
  };
  const toggleButton = () => {
    if (varient === "Customer") {
      reset();
      setVarient("Admin");
    } else {
      reset();
      setVarient("Customer");
    }
  };

  return (
    <>
    {model === false && 
      <><h1 style={{ textAlign: "center", marginTop: "50px" }}>
          {varient} Registration Form
        </h1><div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "18px",
          }}
        >
            <button
              type="button"
              onClick={() => toggleButton()}
              style={{
                marginRight: "10px",
                background: varient === "Admin" ? "pink" : "",
              }}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => toggleButton()}
              style={{ background: varient === "Customer" ? "pink" : "" }}
            >
              Customer
            </button>
          </div><form
            className="mt-32px"
            onSubmit={handleSubmit(handleSignUp)}
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="relative">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "10px" }}>
                      <label style={{ fontWeight: "bold" }}>FirstName: </label>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <input
                        type="text"
                        id="firstName"
                        {...register("firstName")}
                        placeholder="Enter FirstName"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "20px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                        }} />
                    </td>
                  </tr>
                  {errors && Object.keys(errors).length > 0 && (
                    <tr style={{ color: "red" }}> {errors?.firstName?.message}</tr>
                  )}
                  <tr>
                    <td style={{ padding: "10px" }}>
                      <label style={{ fontWeight: "bold" }}>LastName: </label>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <input
                        type="text"
                        id="lastName"
                        {...register("lastName")}
                        placeholder="Enter LastName"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "20px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                        }} />
                    </td>
                  </tr>
                  {errors && Object.keys(errors).length > 0 && (
                    <tr style={{ color: "red" }}> {errors?.lastName?.message}</tr>
                  )}
                  <tr>
                    <td style={{ padding: "10px" }}>
                      <label style={{ fontWeight: "bold" }}>Email: </label>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <input
                        type="text"
                        id="email"
                        {...register("email")}
                        placeholder="Enter email"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "20px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                        }} />
                    </td>
                  </tr>
                  {errors && Object.keys(errors).length > 0 && (
                    <tr style={{ color: "red" }}> {errors?.email?.message}</tr>
                  )}
                  <tr>
                    <td style={{ padding: "10px" }}>
                      <label style={{ fontWeight: "bold" }}>Password: </label>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Enter password"
                        style={{
                          width: "100%",
                          padding: "10px",
                          marginBottom: "20px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxSizing: "border-box",
                        }} />
                    </td>
                  </tr>
                  {errors && Object.keys(errors).length > 0 && (
                    <tr style={{ color: "red" }}> {errors?.password?.message}</tr>
                  )}
                  <tr>
                    <button type="submit">Submit</button>
                  </tr>
                </tbody>
              </table>
            </div>
          </form></>}
      {model && 
      <div>
        <h1>
          You are not authorised to see it</h1></div>}
    </>
  );
};

export default Registration;
