import { Navigate, useParams } from "react-router-dom"
import AppLayout from "../components/layout/AppLayout"
import { useGetCourseLecturesQuery } from "../redux/api/api"
import Loader from "../components/shared/Loader"
import { useState } from "react"

const CoursePage = ({user}) => {

  const [lectureNumber, setLectureNumber] = useState(0)
  const params = useParams()

  const { data, isLoading: loading } = useGetCourseLecturesQuery({courseId: params.id})
  const lectures = data?.lectures || []

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    return <Navigate to={'/subscribe'} />;
  }


  return loading? (<Loader/>) : (
    <div className="grid grid-cols-12 min-h-[90vh] ">
      {lectures && lectures.length > 0 ? (
        <>        
          <div className=" col-span-9">
            <video 
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
            ></video>
            <h3 className="m-4 font-semibold">{`#${lectureNumber + 1} ${ lectures[lectureNumber].title}`}</h3>
            <label className="m-4">Description</label>
            <p className="m-4">{lectures[lectureNumber].description}</p>
          </div>

          <div className="col-span-3">

          {lectures.map((element, index) => (
            <button
              onClick={() => setLectureNumber(index)}
              key={element._id}
              style={{
                width: '100%',
                padding: '1rem',
                textAlign: 'center',
                margin: 0,
                borderBottom: '1px solid rgba(0,0,0,0.2)',
              }}
            >
              <p>
                #{index + 1} {element.title}
              </p>
            </button>
          ))}

          </div>
        </>
      ) : (
        <h4 className="text-lg font-semibold">No Lectures</h4>
      )}

    </div>
  )
}

export default AppLayout()(CoursePage)