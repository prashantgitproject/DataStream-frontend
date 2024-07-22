import { DiGithub } from "react-icons/di"
import { TiSocialInstagramCircular, TiSocialYoutubeCircular } from "react-icons/ti"

const Footer = () => {
  return (
    <div className="p-4 bg-black min-h-[10vh]">
      <div className="flex gap-2 items-center justify-between">
        <h3 className="text-white font-semibold text-lg">All right reserved</h3>
        <div className="flex gap-2 text-4xl text-white">
          <a href="https://youtube.com" target={'blank'}>
            <TiSocialYoutubeCircular />
          </a>
          <a href="https://instagram.com" target={'blank'}>
            <TiSocialInstagramCircular />
          </a>
          <a href="https://github.com" target={'blank'}>
            <DiGithub />
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer