import React, { useEffect, useState } from "react";
import Logo from "../../../assets/logo.png";
import authBackground from "../../../assets/auth-background.jpeg";
import { useParams } from "react-router-dom";
import * as NonAuthService from "../../api/service/NonAuthService";
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [validRegister, setValidRegister] = useState("");
  const { id } = useParams();
//   useEffect(() => {
//     if (!id) {
//       navigate("/");
//     }
//   }, [id]);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if passwords match
    // if (password !== passwordConfirmation) {
    //   ("Passwords do not match.");
    //   return;
    // }

    // Perform form submission logic here (e.g., API call)
    console.log("Form submitted:", { email, password, passwordConfirmation });
    try {
      const response = await NonAuthService.update_password_api({
        verify_reset_email_token: id,
        password,
        confirm_password: passwordConfirmation,
      });
      if (response.status) {
        setValidRegister("Password updated successfully");
        navigate("/");
      } else {
        setValidRegister("Error updating password");
      }
      console.log(response);
    } catch (error) {}
    // Clear form inputs after submission
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");

    // You can add your API call or further logic for password reset here
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <img
        src={authBackground}
        className="absolute z-0 w-full h-full object-cover top-0"
        alt="Background"
      />
      <div className="relative z-10  flex flex-col justify-center items-center w-full md:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <img src={Logo} alt="Logo" style={{ width: "91px" }} className="z-10" />
        <form className=" w-full" onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="token"
            value="0c860bbff76798380eb17f44323304d4"
          />

          {/* <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div> */}

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password_confirmation"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              autoComplete="new-password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {validRegister !== "" && (
            <div className="text-sm text-red-500 ml-1 mt-2">
              {validRegister}
            </div>
          )}
          <div className="flex items-center justify-end mt-6">
            <button
              type="submit"
              className="py-1 px-10 rounded-sm font-medium flex items-center justify-center text-white bg-primary"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>

      {/* Logo */}
      {/* <div className="absolute top-0 left-0 mt-4 ml-4">
      
      </div> */}
    </div>
  );
};

export default ResetPassword;
