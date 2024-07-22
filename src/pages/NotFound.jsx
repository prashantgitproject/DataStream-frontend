import { Link } from "react-router-dom"
import AppLayout from "../components/layout/AppLayout"
import { RiErrorWarningFill } from "react-icons/ri"

const NotFound = () => {
  return (
    <div className="min-h-[85vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <RiErrorWarningFill size={'5rem'} />
        <h1 className="text-lg font-bold">Page Not Found</h1>  
        <Link to={'/'}>Go to Home</Link>
      </div> 
    </div>
  )
}

export default AppLayout()(NotFound)