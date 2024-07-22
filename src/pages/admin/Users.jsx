import { Box, Button, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import AdminLayout from '../../components/layout/AdminLayout'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import Loader from '../../components/shared/Loader'
import { useAsyncMutation } from '../../hooks/hooks'
import { useChangeRoleMutation, useDeleteUserMutation, useGetAllUsersQuery } from '../../redux/api/adminAPI'

const Users = () => {

  const {data, isLoading} = useGetAllUsersQuery()
  const [changeRole] = useAsyncMutation(useChangeRoleMutation)
  const [deleteUser] = useAsyncMutation(useDeleteUserMutation)
  
  const users = data?.users
  

  const updateHandler = async (userId) => {
    await changeRole('Updating user role...', userId);
  };
  const deleteButtonHandler = async (userId) => {
    await deleteUser('Deleting user...', userId);
  };

  return isLoading? (<Loader/>) : (
    <AdminLayout>
      <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available users in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {users &&
                users.map(item => (
                  <Row
                    updateHandler={updateHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    key={item._id}
                    item={item}
                    // loading={loading}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminLayout>
  )
}

export default Users

function Row({ item, updateHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td>
        {item.subscription && item.subscription.status === 'active'
          ? 'Active'
          : 'Not Active'}
      </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            Change Role
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}