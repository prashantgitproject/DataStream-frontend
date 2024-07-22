import { useInputValidation } from "6pp"
import { emailValidator } from "../utils/validators";
import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

const Contact = () => {

  const name = useInputValidation('');
  const email = useInputValidation('', emailValidator);
  const [message, setMessage] = useState('')

  return (
    <section className="max-w-2xl mx-auto h-[92vh] flex items-center md:p-0 p-2">
      <div className="w-full">
        <h1 className=" text-center text-xl font-bold">Contact Us</h1>
        <form className="flex flex-col gap-2 w-full">
          <label>Name</label>
          <input type="text" value={name.value} onChange={name.changeHandler}/>
          <label>Email</label>
          <input type="email" value={email.value} onChange={email.changeHandler}/>
          <label>Message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>

          <button className="p-2 bg-yellow-500 font-semibold" type="submit">Submit</button>
        </form>
      </div>
    </section>
  )
}

export default AppLayout()(Contact)