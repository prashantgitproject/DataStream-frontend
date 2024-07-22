import { useSelector } from "react-redux"
import Title from "../shared/Title"
import Footer from "./Footer"
import Header from "./Header"

const AppLayout = () => (WrappedComponent) => {
    return (props) => {

    const {user} = useSelector((state) => state.auth);

    return(
    <div className='min-h-[100vh]'>
        <Title/>
        <div className=''>
          <Header/>
        </div>

        <div className=''>
        <WrappedComponent {...props} user={user}/>
        </div>

        <div className=' w-full h-[4rem] '>
          <Footer/>
        </div>
    </div>
    )
  }
}

export default AppLayout