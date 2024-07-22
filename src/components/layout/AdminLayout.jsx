import { Dashboard, ExitToApp, ManageAccounts, Menu } from '@mui/icons-material'
import { Drawer, DrawerContent, DrawerOverlay, useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useLocation } from 'react-router-dom'
import { RiAddCircleFill, RiEyeFill } from 'react-icons/ri';
import cursor from '../../assets/images/cursor.png'
import { AdminFalse } from '../../redux/reducers/admin';
import axios from 'axios';
import { server } from '../../constants/config';
import { useAsyncMutation } from '../../hooks/hooks';
import { useAdminLogoutMutation } from '../../redux/api/adminAPI';

export const getAdmin = async () => {
  try {
    const { data } = await axios.get(`${server}/api/v1/admin/`, { withCredentials: true });
    return data.admin;
  } catch (error) {
    console.log(error);
  }
}

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccounts />,
  },
  {
    name: "Create Course",
    path: "/admin/createcourse",
    icon: <RiAddCircleFill />,
  },
  {
    name: "Courses",
    path: "/admin/courses",
    icon: <RiEyeFill />,
  },
];


const SideBar = ({w='100%'}) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [adminLogout] = useAsyncMutation(useAdminLogoutMutation)

  const logoutHandler = async () => {
    await adminLogout('logging out...')
    dispatch(AdminFalse());
  };

  return (
    <div className={`flex flex-col gap-12 p-12 w-[${w}]`}>
      <h3 className=' uppercase text-center font-semibold'>DataStream</h3>

      <div className='flex flex-col gap-4'>
        {adminTabs.map((tab) => (
         <Link key={tab.path} to={tab.path} className={`p-4 hover:text-gray-500 rounded-full ${location.pathname === tab.path ? 'bg-black text-white hover:text-white': ''}`}>
            <div className='flex gap-4 items-center'>
              {tab.icon}
              <p className='text-lg'>{tab.name}</p>
            </div>
         </Link>  ))}

         <button onClick={logoutHandler} className={`p-4 hover:text-gray-500 rounded-full mt-8`}>
            <div className='flex gap-4 items-center'>
              <ExitToApp/>
              <p className='text-lg'>Logout</p>
            </div>
         </button>
      </div>

    </div>
  )
}


const AdminLayout = ({children}) => {
  const {isAdmin} = useSelector(state => state.admin);



    const {isOpen, onClose, onOpen} = useDisclosure();

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <div className={`grid grid-cols-12 min-h-[100vh] `} style={{cursor: `url(${cursor}), default`}}>
      <div className='block md:hidden fixed right-4 top-4'>
        <button className='flex justify-center' onClick={onOpen}>
          <Menu/>
        </button>
      </div>

      <div className='hidden md:block md:col-span-4 lg:col-span-3'>
        <SideBar />
      </div>

      <div className='col-span-12 md:col-span-8 lg:col-span-9 bg-gray-300'>
        {children}
      </div>

      <Drawer placement='left' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay/>
          <DrawerContent>
            <SideBar w={'50vw'}/>
          </DrawerContent>
      </Drawer>  
    </div>
  )
}

export default AdminLayout