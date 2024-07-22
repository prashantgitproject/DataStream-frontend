import { RiErrorWarningFill } from "react-icons/ri"
import { Link } from "react-router-dom"
import AppLayout from "../../components/layout/AppLayout"

const PaymentFail = () => {
  return (
    <div className="min-h-[85vh] flex justify-center items-center">
    <div className="flex flex-col justify-center items-center">
      <RiErrorWarningFill size={'5rem'} />
      <h1 className="text-lg font-bold">Payment Fail</h1>  
      <Link to={'/subscribe'}>Try again</Link>
    </div> 
  </div>
  )
}

export default AppLayout()(PaymentFail)