import { useInputValidation } from '6pp';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAdminLoginMutation } from '../../redux/api/adminAPI';
import toast from 'react-hot-toast';
import { AdminFalse, AdminTrue } from '../../redux/reducers/admin';

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {isAdmin} = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const [adminLogin] = useAdminLoginMutation();

  const secretKey = useInputValidation("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Verifying...");

    try {
    const res = await adminLogin(secretKey.value);

    if (res.data) {
      toast.success(res.data.message || "Updated data successfully", {
        id: toastId,
      });
      dispatch(AdminTrue());
    } else {
      toast.error( res?.error?.data?.message ||"Something went wrong", { id: toastId });
      dispatch(AdminFalse());
    }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
      dispatch(AdminFalse());
    } finally {
      setIsLoading(false);
    }
  };


    if (isAdmin) return <Navigate to="/admin/dashboard" />;
  return (
    <section className='flex justify-center items-center h-[100vh] bg-gray-700'>
      <div className='p-4 flex items-center justify-center flex-col gap-2 bg-gray-100 shadow-2xl rounded-lg max-w-xs w-full'>
        
          <div className='w-full text-center'>  
          <h4>Admin Login</h4>
          <form onSubmit={submitHandler} className='flex flex-col gap-2'>
            <input type="password" value={secretKey.value} onChange={secretKey.changeHandler} placeholder="Secret Key" className='p-2 border-2 rounded-md' />
            <button disabled={isLoading} type="submit" className={` p-2 bg-blue-500 text-white rounded-md`}>Login</button>
          </form>
          </div>

      </div>
    </section>
  )
}

export default AdminLogin