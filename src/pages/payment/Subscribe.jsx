import AppLayout from "../../components/layout/AppLayout"
import { useGetRazorpayKeyQuery, useGetSubscriptionQuery } from "../../redux/api/api"
import logo from "../../assets/images/logo.png"
import { server } from "../../constants/config";

const Subscribe = ({user}) => {

  const {data} = useGetRazorpayKeyQuery();
  const key = data?.key;

  const {data: subscription} = useGetSubscriptionQuery();
  const subscriptionId = subscription?.subscriptionId;
  
  const subscribeHandler = () => {

    if(subscriptionId){
      const options = {
        key,
        name: "Data-Stream Pro Pack",
        description: "Join pro pack and get access to all content.",
        amount: 29900,
        image: logo,
        subscription_id: subscriptionId,
        callback_url: `${server}/api/v1/payment/paymentverification`,
        prefill: {
          name: user.name,
          email: user.email,
          contact: ''
        },
        notes: {
          address: "Hello World"
        },
        theme: {
          color: "#FFC800"
        }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  }

  return (
    <div className="min-h-[85vh]">
      <div className=" container mx-auto max-w-xl h-[80vh] p-16">
        <h2 className="text-center text-xl font-bold">Welcome</h2>
        <div className="rounded-lg shadow-2xl shadow-yellow-500">
          <div className="bg-yellow-400 p-4">Pro Pack - ₹299.00</div>
          <div className="p-4 px-8 mt-4 flex flex-col gap-8 text-center">
            <p>Join pro pack and get access to all content.</p>
            <h4 className="font-semibold text-lg">₹299 Only</h4>
            <button onClick={subscribeHandler} className="my-8 w-full rounded-lg text-center bg-yellow-500 p-2">Buy Now</button>
          </div>
          <div className="p-4 bg-gray-700">
            <h4 className="text-white uppercase">100% refund at cancellation</h4>
            <p className="text-white">*Terms & Conditions Apply</p>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default AppLayout()(Subscribe)