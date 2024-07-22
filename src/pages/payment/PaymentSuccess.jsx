import { RiCheckboxCircleFill } from "react-icons/ri"
import { Link, useSearchParams } from "react-router-dom"

const PaymentSuccess = () => {

  const reference = useSearchParams()[0].get('reference')

  return (
    <div className="min-h-[85vh]">
    <div className=" container mx-auto max-w-xl h-[80vh] p-16">

      <h2 className="text-center text-xl font-bold">You have a Pro Pack</h2>

      <div className="rounded-lg shadow-2xl shadow-yellow-500">
        <div className="bg-yellow-400 p-4">Payment Success</div>
        <div className="p-4 px-8 mt-4 flex flex-col gap-8 text-center">
          <p>Congratulation you're a pro member. You have access to premium
          content.</p>
          <div className="text-4xl flex justify-center"><RiCheckboxCircleFill /></div>
        </div>
        <div className="flex flex-col gap-2 text-center p-4">
          <Link to="/profile" className="text-center text-lg">Go to Profile</Link>
          <h4>Refrence: {reference}</h4>
        </div>

      </div>  
    </div>
  </div>
  )
}

export default PaymentSuccess