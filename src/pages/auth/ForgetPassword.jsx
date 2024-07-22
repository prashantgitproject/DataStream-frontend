import {  useInputValidation } from "6pp";
import {  useState } from "react"
import { emailValidator } from "../../utils/validators";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../constants/config";
import bcrypt from 'bcryptjs-react';
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {

  const navigate = useNavigate();

  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [otp, setOtp] = useState('')

  const email = useInputValidation('', emailValidator);
  const code = useInputValidation('');
  const password = useInputValidation('');
  const confirmPassword = useInputValidation('');


  const sendOTP = async () => {
    const toastId = toast.loading("Sending OTP...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/forgetpassword`,
        {
          email: email.value,
        },
        config
      );

      setOtp(data.hashedOtp);

      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error((error?.response?.data?.message) || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  }



  const Verify = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Verifying...");

    if(bcrypt.compareSync(code.value, otp) === false){
      setIsLoading(false);
      return toast.error("Invalid OTP", {
          id: toastId,
      });
  }

    setIsVerified(true);
    toast.success("OTP Verified", {
      id: toastId,
    });
  };


  const changePassword = async (e) => {
    e.preventDefault();

    if(password.value !== confirmPassword.value) return toast.error("Passwords do not match");

    const toastId = toast.loading("Updating Password...");
    setIsLoading(true); 


    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/updatepassword`,
        {
          email: email.value,
          password: password.value,
        },
        config
      );

      toast.success(data.message, {
        id: toastId,
      });

      navigate('/authenticate')
      
    } catch (error) {
      console.log(error);
      toast.error((error?.response?.data?.message) || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='flex justify-center items-center h-[100vh] bg-gray-900'>
      <div className='p-8 flex items-center justify-center flex-col gap-2 bg-[#292e36] shadow-2xl shadow-[#25e2ff40] rounded-lg max-w-xs w-full'>
        {!isVerified ? (

          <div className='w-full text-center'>  
          <h4 className='text-white py-2 font-semibold'>Forget Password</h4>
          <form onSubmit={Verify} className='flex flex-col gap-2'>
            <div className="w-full">
              <input type="text" placeholder="email" value={email.value} onChange={email.changeHandler} className='p-2 border-2 rounded-md w-full' />
              <button className="text-white flex justify-end w-full" onClick={sendOTP} type="button">Send OTP</button>
            </div>
            <input type="text" value={code.value} onChange={code.changeHandler} placeholder="OTP" className='p-2 border-2 rounded-md' />
            <button disabled={isLoading} type="submit" className={`${isLoading? ' bg-blue-300':''} p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md`}>Submit</button>
          </form>
          </div>

          ) : (

          <div className='w-full text-center'>
          <h4 className='text-white py-2 font-semibold'>Update Password</h4>
          <form onSubmit={changePassword} className='flex flex-col gap-2'>
            <input type="password" required={true} value={password.value} onChange={password.changeHandler} placeholder="Password" className='p-2 border-2 rounded-md' />
            <input type="password" required={true} value={confirmPassword.value} onChange={confirmPassword.changeHandler} placeholder="Confirm Password" className='p-2 border-2 rounded-md' />
            <button disabled={isLoading} type="submit" className={`${isLoading? 'bg-blue-300' : ''} p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md`}>Submit</button>
          </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default ForgetPassword