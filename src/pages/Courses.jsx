import { useInputValidation } from "6pp"
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddToPlaylistMutation, useGetAllCoursesQuery } from "../redux/api/api";
import { useAsyncMutation } from "../hooks/hooks";
import AppLayout from "../components/layout/AppLayout";
import { getUser } from "../App";
import { userExists } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <section className="flex flex-col gap-2">
      <img src={imageSrc} alt="course" className=" object-contain aspect-video w-[12rem]"/>
      <h3 className="text-center text-lg font-semibold">{title}</h3>
      <p>{description}</p>

      <div className="flex gap-2 items-center">
        <label>Creator</label>
        <span>{creator}</span>
      </div>

      <h4 className="uppercase text-lg">Lectures - {lectureCount}</h4>
      <h4 className="text-sm">View - {views}</h4>

      <div className="flex gap-4">
        <Link to={`/course/${id}`} className="p-2 bg-yellow-500 rounded-lg"> Watch Now </Link>
        <button disabled={loading} className="text-yellow-500" onClick={() => addToPlaylistHandler(id)}>Add to playlist</button>
      </div>
    </section>
  )
}

const Courses = () => {

  const keyword = useInputValidation('')
  const [category, setCategory] = useState('')

  const {data} = useGetAllCoursesQuery({category, keyword: keyword.value});

  const [addToPlaylist, isLoading] = useAsyncMutation(useAddToPlaylistMutation);

  const dispatch = useDispatch();

  const addToPlaylistHandler = async (courseId) => {
    await addToPlaylist(`Adding to playlist...`, courseId);
    dispatch(userExists(await getUser()));
  };




  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  return (
    <section className="max-w-2xl mx-auto min-h-[95vh]">
      <h2 className="text-xl text-center font-semibold m-8">All Courses</h2>
      <input className="w-full" type="text" placeholder="Search a course..." value={keyword.value} onChange={keyword.changeHandler}/>

      <div className="flex gap-4 py-8 overflow-x-auto">
        {categories.map((category, index) => (
          <button key={index} className="p-2 rounded-lg bg-gray-300 min-w-60" onClick={() => setCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {data?.courses.length > 0 ? data?.courses.map((item, index) => (
            <Course 
            key={item._id}
            title={item.title}
            description={item.description}
            views={item.views}
            imageSrc={item.poster.url}
            id={item._id}
            creator={item.createdBy}
            lectureCount={item.numOfVideos}
            addToPlaylistHandler={addToPlaylistHandler}
            loading={isLoading}
            />
        )) : (
          <h2 className="text-center text-lg font-semibold">No course found</h2>
        )}
      </div>

    </section>
  )
}

export default AppLayout()(Courses) 