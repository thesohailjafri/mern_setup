import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
  ButtonGroup,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import useAxiosMutation from '../hooks/axios/useAxiosMutation'
import { apiEndpoints } from '../default'
import useAuthor from '../hooks/store/useAuthor'
import { formatDate } from '../utils/format.util'
import useAxiosQuery from '../hooks/axios/useAxiosQuery'
import { AuthorDocument } from '../types/document'
const validationSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
})
const initialValues = {
  _id: '',
  name: '',
  email: '',
}
export default function AuthorPanel() {
  const toast = useToast()
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure()
  const records = useAuthor((state) => state.records)
  const setRecords = useAuthor((state) => state.setRecords)
  const addRecords = useAuthor((state) => state.addRecords)
  const deleteRecords = useAuthor((state) => state.deleteRecords)
  const updateRecords = useAuthor((state) => state.updateRecords)
  useAxiosQuery(apiEndpoints.authors, {
    onComplete: (data) => {
      setRecords(data)
    },
  })

  const { mutate: addAuthorMn } = useAxiosMutation('post', {
    onComplete: (data) => {
      toast({
        title: 'Success',
        description: 'Author added successfully',
        status: 'success',
      })
      addRecords([data])
      addFormik.resetForm()
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Error adding author',
        status: 'error',
      })
    },
  })
  const { mutate: deleteAuthorMn, isLoading: deleteIsLoading } =
    useAxiosMutation('delete', {
      onComplete: (data) => {
        toast({
          title: 'Success',
          description: 'Author deleted successfully',
          status: 'success',
        })
        deleteRecords([data._id])
      },
      onError: () => {
        toast({
          title: 'Error',
          description: 'Error deleting author',
          status: 'error',
        })
      },
    })
  const { mutate: editAuthorMn } = useAxiosMutation('put', {
    onComplete: (data) => {
      toast({
        title: 'Success',
        description: 'Author updated successfully',
        status: 'success',
      })
      updateRecords([data])
      onEditClose()
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Error updating author',
        status: 'error',
      })
    },
  })
  const addFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await addAuthorMn({
        url: apiEndpoints.authors,
        data: values,
      })
    },
  })
  const editFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await editAuthorMn({
        url: apiEndpoints.authors + '/' + values._id,
        data: values,
      })
    },
  })

  const onEdit = (record: AuthorDocument) => {
    editFormik.setValues(record)
    onEditOpen()
  }
  return (
    <Box>
      <Stack spacing="5">
        <Stack
          as={'form'}
          spacing="6"
          onSubmit={(e) => {
            e.preventDefault()
            addFormik.handleSubmit()
          }}
        >
          <HStack>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Enter name"
                id="name"
                name="name"
                onChange={addFormik.handleChange}
                value={addFormik.values.name}
                isInvalid={!!addFormik.errors.name}
                errorBorderColor="red.300"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Enter email"
                id="email"
                name="email"
                onChange={addFormik.handleChange}
                value={addFormik.values.email}
                isInvalid={!!addFormik.errors.email}
                errorBorderColor="red.300"
              />
            </FormControl>
          </HStack>
          <Button
            colorScheme="blue"
            type="submit"
            isLoading={addFormik.isSubmitting}
            disabled={addFormik.isSubmitting}
          >
            Submit
          </Button>
        </Stack>
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Created At</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((record) => (
                <Tr>
                  <Td>{record.id}</Td>
                  <Td>{record.name}</Td>
                  <Td>{record.email}</Td>
                  <Td>{formatDate(record.createdAt)}</Td>
                  <Td>
                    <ButtonGroup>
                      <Button
                        colorScheme="blue"
                        onClick={() => {
                          onEdit(record)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        colorScheme="red"
                        isLoading={deleteIsLoading}
                        disabled={deleteIsLoading}
                        onClick={() => {
                          deleteAuthorMn({
                            url: apiEndpoints.authors + '/' + record._id,
                          })
                        }}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack
                as={'form'}
                spacing="6"
                onSubmit={(e) => {
                  e.preventDefault()
                  editFormik.handleSubmit()
                }}
              >
                <HStack>
                  <FormControl id="name">
                    <FormLabel>Name</FormLabel>
                    <Input
                      placeholder="Enter name"
                      id="name"
                      name="name"
                      onChange={editFormik.handleChange}
                      value={editFormik.values.name}
                      isInvalid={!!editFormik.errors.name}
                      errorBorderColor="red.300"
                    />
                  </FormControl>
                  <FormControl id="email">
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Enter email"
                      id="email"
                      name="email"
                      onChange={editFormik.handleChange}
                      value={editFormik.values.email}
                      isInvalid={!!editFormik.errors.email}
                      errorBorderColor="red.300"
                    />
                  </FormControl>
                </HStack>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onEditClose}>
                Close
              </Button>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={editFormik.isSubmitting}
                disabled={editFormik.isSubmitting}
                onClick={() => editFormik.handleSubmit()}
              >
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Stack>
    </Box>
  )
}
