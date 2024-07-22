import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout"
import { Box, Button, HStack, Heading, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tooltip, Tr, useDisclosure } from '@chakra-ui/react'
import { RiDeleteBin7Fill } from "react-icons/ri";
import CourseModal from "./CourseModal";
import { useDeleteCourseMutation, useDeleteLectureMutation, useGetAllCoursesQuery, useUpdateCourseMutation } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hooks";


const AdminCourses = () => {

  const {data, isLoading } = useGetAllCoursesQuery({category: '', keyword: ''})
  const [addLecture] = useAsyncMutation(useUpdateCourseMutation)
  const [deleteLecture] = useAsyncMutation(useDeleteLectureMutation)
  const [deleteCourse] = useAsyncMutation(useDeleteCourseMutation)

  const courses = data?.courses || []

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const coureDetailsHandler = (courseId, title) => {
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };

  const modalClose = () => {
    onClose();
    setCourseId('');
    setCourseTitle('');
  }
  const deleteButtonHandler = (courseId) => {
    console.log('courseId', courseId);
    deleteCourse('Deleting Course...', { courseId });
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    console.log(courseId, lectureId);
    await deleteLecture('Deleting Lecture...', { courseId, lectureId });
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    console.log('courseId', courseId);
    const formData = new FormData();

    formData.append('id', courseId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', video);

    await addLecture('Adding Lecture...', formData);
  };

  return (
    <AdminLayout>
      <Box p={['0', '8']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Courses"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available courses in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Poster</Th>
                <Th>Title</Th>
                <Th>Category</Th>
                <Th>Creator</Th>
                <Th isNumeric>Views</Th>
                <Th isNumeric>Lectures</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {courses.map((item) => (
                <Row
                  coureDetailsHandler={coureDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={isLoading}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <CourseModal
          isOpen={isOpen}
          onClose={modalClose}
          id={courseId}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
        />
      </Box>
    </AdminLayout>
  )
}

export default AdminCourses

function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>

      <Td>
        <Image src={item.poster.url} />
      </Td>

      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => coureDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            View Lectures
          </Button>

          <Tooltip label="Delete Course" aria-label="Delete Course">
            <Button
              onClick={() => deleteButtonHandler(item._id)}
              color={'purple.600'}
              isLoading={loading}
            >
              <RiDeleteBin7Fill />
            </Button>
          </Tooltip>
        </HStack>
      </Td>
    </Tr>
  );
}