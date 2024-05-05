import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { loginData } from "./types/login.type";
import { loginValidationSchema } from "./schema/login.schema";
import { useState } from "react";

const Login = () => {
  const [model, setModel] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>({
    defaultValues: {},
    resolver: yupResolver<loginData>(loginValidationSchema),
  });
  const handleSignUp = async (values: loginData) => {
    const data = {
      ...values,
    };
    console.log(data);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/user/login`,
      data
    );
    if (response.status === 200) {
      setModel(true);
    }
  };

  return (

    <div className="relative">
    {model === false && 
    <form
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
                  }}
                />
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
                  }}
                />
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
    </form>
}
    {model && <h1>Success</h1>}
    </div>
  );
};

export default Login;
