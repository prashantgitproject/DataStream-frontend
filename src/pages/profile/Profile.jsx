import { useFileHandler, useInputValidation } from "6pp"
import { Avatar, Button, HStack, Image, Stack, VStack, useDisclosure } from "@chakra-ui/react"
import { CameraAlt, ChevronLeft, Logout } from "@mui/icons-material";
import axios from "axios";
import { lazy, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../constants/config";
import { Link } from "react-router-dom";
import { userExists, userNotExists } from "../../redux/reducers/auth";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useAsyncMutation } from "../../hooks/hooks";
import { useCancelSubscriptionMutation, useRemoveFromPlaylistMutation } from "../../redux/api/api";
import { getUser } from "../../App";

const ConfirmLogoutDialog = lazy(() => import('../../components/dialogs/ConfirmLogoutDialog'))

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch = useDispatch();

  const [removeFromPlaylist] = useAsyncMutation(useRemoveFromPlaylistMutation);
  const [cancelSubscription] = useAsyncMutation(useCancelSubscriptionMutation);

  const {user, loading} = useSelector((state) => state.auth);

  const name = useInputValidation(`${user?.name || ''}`);

  const avatar = useFileHandler('single');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar.file || '');
    formData.append("name", name.value);
    formData.append("id", user._id)

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.put(
        `${server}/api/v1/user/updateprofile`,
        formData,
        config
      );

      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something Went Wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  }

  const cancelHandler = async () => {
    await cancelSubscription(`Cancelling Subscription...`);
    dispatch(userExists(await getUser()));
  }

  const removeFromPlaylistHandler = async id => {
    await removeFromPlaylist(`Removing from playlist...`, id);
    dispatch(userExists(await getUser()));
  };

  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <>
    <div className="p-4 w-[80vw] h-[10vh] mx-auto flex">
      <Link to={'/'}><ChevronLeft/></Link>
      <div className="grow"/>
      <button onClick={onOpen} className="flex gap-1 p-2 hover:bg-gray-500">Logout <Logout/></button>
    </div>
    <section className="max-w-2xl mx-auto h-[90vh]">
      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-4 flex items-center relative w-[8rem] h-[8rem]">
          <Avatar sx={{  width: "8rem", height: "8rem", objectFit: "contain",}} src={avatar.preview || user?.avatar?.url} />
          <label className='rounded-full p-1 absolute bottom-0 right-0 text-white bg-slate-700 hover:bg-slate-900'>
            <CameraAlt/>
            <input type="file" id="file" required={true} className='absolute hidden' onChange={avatar.changeHandler}/>
          </label>
        </div>

        {avatar.error && <span className='text-red-400 text-sm text-center'>{avatar.error}</span>}

        <div className="col-span-8 ">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>Name:</label>
            <input required={true} type="text" value={name.value} onChange={name.changeHandler}/>
            <label>Email:</label>
            <input className="text-gray-600" type="text" value={user.email} disabled/>
            <button type="submit" disabled={isLoading} className={`${isLoading? ' bg-blue-300':''} p-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md mt-4`}>Update Profile</button>
            <Link to={'/resetpassword'} className="text-gray-700 hover:text-gray-900 my-3">Reset Password</Link>
          </form>
            {user.role !== 'admin' && (
              <div className="flex gap-4 items-center mt-4">
              <label>Subscription:</label>
              {user.subscription && user.subscription.status === 'active' ? (
                <button disabled={isLoading} className={`text-lg text-yellow-500`} onClick={cancelHandler}>Cancel Subscription</button>
              ): (
              <Link to={'/subscribe'} className="p-2 bg-yellow-500 text-white font-semibold rounded-lg">Subscribe</Link>
              )}
              </div>
            )}
        </div>
      </div>
      {user.playlist.length > 0 && (
        <Stack
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap="wrap"
          p="4"
        >
          {user.playlist.map(element => (
            <VStack w="48" m="2" key={element.course}>
              <Image
                boxSize={'full'}
                objectFit="contain"
                src={element.poster}
              />

              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={'ghost'} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>

                <Button
                  isLoading={loading}
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}
    </section>
    
    <ConfirmLogoutDialog isOpen={isOpen} onClose={onClose} logoutHandler={logoutHandler}/>

    </>
  )
}

export default Profile