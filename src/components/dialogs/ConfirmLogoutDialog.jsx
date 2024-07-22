import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react";



const ConfirmLogoutDialog = ({isOpen, onClose, logoutHandler}) => {

  const cancelRef = useRef()

  return (
    <AlertDialog
      motionPreset='slideInBottom'
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>Logout?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          Are you sure you want to logout?
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button onClick={logoutHandler} colorScheme='red' ml={3}>
            Logout
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmLogoutDialog