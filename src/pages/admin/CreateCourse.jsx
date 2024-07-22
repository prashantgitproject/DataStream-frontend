import { useFileHandler, useInputValidation } from "6pp";
import AdminLayout from "../../components/layout/AdminLayout"
import { useState } from "react";
import { useCreateCourseMutation } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hooks";

const CreateCourse = () => {

  const title = useInputValidation('');
  const description = useInputValidation('');
  const [category, setCategory] = useState('');
  const createdBy = useInputValidation('');
  const image = useFileHandler('single');

  const [createCourse] = useAsyncMutation(useCreateCourseMutation);



  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const submitHandler = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title.value);
    myForm.append('description', description.value);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy.value);
    myForm.append('file', image.file || '');
    
     await createCourse('Creating Course...' ,myForm);
  };

  return (
    <AdminLayout>
        <div className="py-16 max-w-2xl mx-auto">
          <h3 className="text-center text-lg font-bold">Create Course</h3>
          <form onSubmit={submitHandler} className="flex flex-col gap-2">
            <input value={title.value} onChange={title.changeHandler} type="text" placeholder="Title"/>
            <input value={description.value} onChange={description.changeHandler} type="text" placeholder="Description"/>
            <input value={createdBy.value} onChange={createdBy.changeHandler} type="text" placeholder="Creator Name"/>
            <select value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">Category</option>

              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <label className="border p-2 cursor-pointer my-2">
              Upload
              <input className="hidden absolute" type="file" onChange={image.changeHandler}/>
            </label>
            {image.error && <span className='text-red-400 text-sm text-center'>{image.error}</span>}
            {image.preview && (
              <img className="  h-[10rem] w-[50%] self-center" src={image.preview || ''} alt="thumbnail" />
            )}
          <button type="submit" className="p-2 border rounded-lg">
            Create
          </button>
          </form>
        </div>   
    </AdminLayout>
  )
}

export default CreateCourse