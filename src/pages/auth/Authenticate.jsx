import {  useInputValidation } from "6pp";
import { lazy, useState } from "react"
import { emailValidator } from "../../utils/validators";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../constants/config";
import { userExists } from "../../redux/reducers/auth";
import { Link, Navigate } from "react-router-dom";

const Authenticate = () => {


  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistered, setIsRegistered] = useState(false)
  const toggleLogin = () => {setIsLogin(!isLogin), email.clear(), password.clear(), confirmPassword.clear()}

  const dispatch = useDispatch();

  const email = useInputValidation('', emailValidator);
  const password = useInputValidation('');
  const confirmPassword = useInputValidation('');


  const handleLogin = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Logging In...");

    setIsLoading(true);
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          email: email.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(data.user));
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
  };


  const handleSignUp = async (e) => {
    e.preventDefault();

    if(password.value !== confirmPassword.value) return toast.error("Passwords do not match");

    const toastId = toast.loading("Signing Up...");
    setIsLoading(true); 


    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/verify`,
        {
          email: email.value,
        },
        config
      );

      sessionStorage.setItem('otp', data.hashedOtp);
      sessionStorage.setItem('email', email.value);
      sessionStorage.setItem('password', password.value);

      toast.success(data.message, {
        id: toastId,
      });
      
      setIsRegistered(true);
    } catch (error) {
      console.log(error);
      toast.error((error?.response?.data?.message) || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if(isRegistered) return <Navigate to='/verify' />

  return (
    <section className='flex justify-center items-center h-[100vh]'>
      <div className='p-4 flex items-center justify-center flex-col gap-2 bg-gray-300 shadow-2xl shadow-yellow-500 rounded-lg max-w-xs w-full'>
        {isLogin ? (
          <div className='w-full text-center'>  
          <h4 className='text-gray-600 py-2 font-semibold'>Login</h4>
          <form onSubmit={handleLogin} className='flex flex-col gap-2'>
            <input type="text" placeholder="email" value={email.value} onChange={email.changeHandler} className='bg-white' />
            <input type="password" value={password.value} onChange={password.changeHandler} placeholder="Password" className='bg-white' />
            <button disabled={isLoading} type="submit" className={`${isLoading? ' bg-yellow-300':''} p-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md font-semibold`}>Login</button>
            <Link to='/forgetpassword' className='text-blue-400 hover:text-cyan-500 my-4'>Forget Password?</Link>
            <span className='text-center text-gray-600'>OR</span>
          </form>
          <button disabled={isLoading} onClick={toggleLogin}
            type="button" className='text-center text-yellow-600 mt-2'>Sign Up instead</button>
          </div>
          ) : (
          <div className='w-full text-center'>
          <h4 className='text-gray-600 py-2 font-semibold'>Sign Up</h4>
          <form onSubmit={handleSignUp} className='flex flex-col gap-2'>

            <input type="text" required={true} value={email.value} onChange={email.changeHandler} placeholder="email" className='bg-white' />
            
            {email.error && <span className='text-red-400 text-sm text-center'>{email.error}</span>}
            
            <input type="password" required={true} value={password.value} onChange={password.changeHandler} placeholder="Password" className='bg-white' />
            <input type="password" required={true} value={confirmPassword.value} onChange={confirmPassword.changeHandler} placeholder="Confirm Password" className='bg-white' />
            <button disabled={isLoading} type="submit" className={`${isLoading? 'bg-yellow-300' : ''} p-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md font-semibold`}>Sign Up</button>
            <span className='text-center text-gray-600'>OR</span>
            <button disabled={isLoading} onClick={toggleLogin}
             type="button" className='text-center text-yellow-600'>Login instead</button>
          </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default Authenticate