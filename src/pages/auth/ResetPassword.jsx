import {  useInputValidation } from "6pp"
import {  ChevronLeft } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import {  useSelector } from "react-redux";
import { server } from "../../constants/config";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);

  const oldPassword = useInputValidation('');
  const password = useInputValidation('')
  const confirmPassword = useInputValidation('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.value !== confirmPassword.value) return toast.error("Passwords do not match");

    const toastId = toast.loading("Updating...");
    setIsLoading(true);

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `${server}/api/v1/user/resetpassword`,
        {
          id: user._id,
          oldPassword: oldPassword.value,
          password: password.value
        },
        config
      );

      toast.success(data.message, {
        id: toastId,
      });

      navigate('/profile')
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <>
    <div className="p-4 w-[80vw] h-[10vh] mx-auto flex items-center">
      <Link to={'/profile'}><ChevronLeft/></Link>
      <div className="grow"/>
    </div>
    <section className="max-w-lg mx-auto h-[90vh] flex items-center justify-center">
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <label>Old Password:</label>
            <input className="mb-4" required={true} type="text" value={oldPassword.value} onChange={oldPassword.changeHandler}/>
            <label>Password:</label>
            <input required={true} type="password" value={password.value} onChange={password.changeHandler}/>
            <label>Confirm Password:</label>
            <input required={true} type="password" value={confirmPassword.value} onChange={confirmPassword.changeHandler}/>
            <button type="submit" disabled={isLoading} className={`${isLoading? ' bg-blue-300':''} p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md mt-4`}>Reset Password</button>
            <Link to={'/forgetpassword'} className="text-gray-700 hover:text-gray-900 my-3">Forgot Password?</Link>
          </form>
    </section>

    </>
  )
}

export default ResetPassword