import { useInputValidation } from '6pp';
import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { server } from '../../constants/config';
import { userExists } from '../../redux/reducers/auth';
import bcrypt from 'bcryptjs-react';
import { Navigate } from 'react-router-dom';


const Verify = () => {
    const [isLoading, setIsLoading] = useState(false)
    const code = useInputValidation('');

    const otp = sessionStorage.getItem('otp');
    const email = sessionStorage.getItem('email');
    const password = sessionStorage.getItem('password');

    if(!otp || !email || !password){
        return <Navigate to='/authenticate' />
    }

    const dispatch = useDispatch();

    const handleOtp = async (e) => {
        e.preventDefault();

        const toastId = toast.loading("Authenticating...");
        setIsLoading(true);
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if(bcrypt.compareSync(code.value, otp) === false){
            setIsLoading(false);
            return toast.error("Invalid OTP", {
                id: toastId,
            });
        }

        try {
            const { data } = await axios.post(
              `${server}/api/v1/user/register`,
              {
                email: email,
                password: password,
              },
              config
            );
            dispatch(userExists(data.user));
            sessionStorage.clear();
            toast.success(data.message, {
              id: toastId,
            });
          } catch (error) {
            console.log(error);
            toast.error((error?.response?.data?.message) || "Something Went Wrong", {
              id: toastId,
            });
          } finally {
            setIsLoading(false);
          }
    }

  return (
    <section className='flex justify-center items-center h-[100vh] bg-gray-900'>
      <div className='p-4 flex items-center justify-center flex-col gap-2 bg-[#292e36] shadow-2xl shadow-[#25e2ff40] rounded-lg max-w-xs w-full'>
          <div className='w-full text-center'>  
            <h4 className='text-white py-2 font-semibold'>OTP validation</h4>
            <form onSubmit={handleOtp} className='flex flex-col gap-2'>
                <input required={true} type="text" placeholder="email" value={code.value} onChange={code.changeHandler} className='p-2 border-2 rounded-md' />
                <button disabled={isLoading} type="submit" className={`${isLoading? ' bg-blue-300':''} p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md`}>Submit</button>
            </form>
          </div>
      </div>
    </section>
  )
}

export default Verify