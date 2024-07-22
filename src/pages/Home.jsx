import { Link } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout"
import vg from "../assets/images/bg.png"
import introVideo from '../assets/videos/intro.mp4'
import DataChart from "../components/DataCharts/DataChart";
import { doughnutChartData } from "../components/DataCharts/mockData";

const Home = () => {
  return (
    <div className="min-h-[80vh]">
      <div className=" container mx-auto h-[80vh] md:grid md:grid-cols-4 flex flex-col-reverse md:gap-0 gap-8 -mt-10">
        <div className="md:col-span-3 flex flex-col gap-4 justify-center items-center">
          <h2 className="text-xl">Learn Form Experts</h2>
          <Link className="border-black p-2 border-2 rounded-lg" to={'/courses'}>Explore Now!</Link>
        </div>
        <div className="md:col-span-1 flex justify-center items-center">
          <img className="vector-graphics object-contain w-[50%] md:w-full" src={vg} alt="study" />
        </div>
      </div>
      <div className="h-[100vh] w-full flex justify-center items-center">
        <video
          className="w-full md:w-[60%] border-2 border-gray-700 outline-none rounded-lg"
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
        ></video>
      </div>
    </div>
  )
}

export default AppLayout()(Home);