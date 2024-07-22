import { useSelector } from 'react-redux';
import { Avatar, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure, } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import image from '../../assets/images/cursor.png'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';


const Header = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();
  const {user} = useSelector((state) => state.auth);

  const logoutHandler = () => {
    onClose();
    // dispatch(logout());
  };

  return (
    <>
      <div className='hidden md:block p-4'>
          <div className='flex gap-4 items-center justify-center'>
            <Link to={'/'} className='flex gap-1 mr-4 items-center'>
              <img src={image} alt="img" />
              <h2 className='font-semibold text-red-500 text-lg'>DataStream</h2>
            </Link>
            <Link to={'/courses'} className='hover:border-b-2 cursor-pointer p-2'>Courses</Link>
            <Link to={'/about'} className='hover:border-b-2 cursor-pointer p-2'>About</Link>
            <Link to={'/contact'} className='hover:border-b-2 cursor-pointer p-2'>Contact</Link>
            {user && user.role === 'admin' && (
              <Link to={'/admin/dashboard'} className='hover:border-b-2 cursor-pointer '>Dashboard</Link>
            
            )}
            <div className='grow'/>
            <Link to={'/authenticate'} className={`p-2 border border-black bg-yellow-500 rounded-lg cursor-pointer ${user? 'hidden':''}`} >Login</Link>
            {user && (
              <Link to={'/profile'}>
                <Avatar name={user?.name} src={user?.avatar?.url || ''} />
              </Link>
            )}
          </div>
      </div>

      <button onClick={onOpen} className='md:hidden flex justify-center items-center h-12 w-12 bg-yellow-500 rounded-full p-2 z-50 fixed top-6 left-6'>
        <RiMenu5Fill/>
      </button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>DataStream</DrawerHeader>

          <DrawerBody>
            <VStack spacing={'4'} alignItems="flex-start">
              <LinkButton onClose={onClose} url="/" title="Home" />
              <LinkButton
                onClose={onClose}
                url="/courses"
                title="Browse All Courses"
              />
              <LinkButton
                onClose={onClose}
                url="/request"
                title="Request a Course"
              />
              <LinkButton onClose={onClose} url="/contact" title="Contact Us" />
              <LinkButton onClose={onClose} url="/about" title="About" />

              <HStack
                justifyContent={'space-evenly'}
                position="absolute"
                bottom={'2rem'}
                width="80%"
              >
                {user ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link onClick={onClose} to="/profile">
                          <Button variant={'ghost'} colorScheme={'yellow'}>
                            Profile
                          </Button>
                        </Link>
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine />
                          Logout
                        </Button>
                      </HStack>

                      {user && user.role === 'admin' && (
                        <Link onClick={onClose} to="/admin/dashboard">
                          <Button colorScheme={'purple'} variant="ghost">
                            <RiDashboardFill style={{ margin: '4px' }} />
                            Dashboard
                          </Button>
                        </Link>
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/authenticate">
                      <Button colorScheme={'yellow'}>Login</Button>
                    </Link>

                    <p>OR</p>

                    <Link onClick={onClose} to="/authenticate">
                      <Button colorScheme={'yellow'}>Sign Up</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    
    </>
  )

}

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (
  <Link onClick={onClose} to={url}>
    <Button variant={'ghost'}>{title}</Button>
  </Link>
);

export default Header