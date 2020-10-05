import React from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {
  useCurrentUserQuery,
  useCreateResponseMutation,
  GetResponsesDocument,
} from '../../generated/graphql'

type ResponseInputs = {
  username: string
  text: string
}

type ResponseFormProps = {
  threadId: number
}

const ResponseForm: React.FC<ResponseFormProps> = ({ threadId }) => {
  const { data } = useCurrentUserQuery()
  const [createResponse] = useCreateResponseMutation()
  const { register, handleSubmit, reset } = useForm<ResponseInputs>()
  const onSubmit: SubmitHandler<ResponseInputs> = async (data) => {
    try {
      await createResponse({
        variables: {
          text: data.text,
          threadId,
        },
        update: (store, { data }) => {
          store.modify({
            fields: {
              getResponses(existingResponses = []) {
                const newResponse = store.writeQuery({
                  query: GetResponsesDocument,
                  data: data?.createResponse,
                })
                return [...existingResponses, newResponse]
              },
            },
          })
        },
      })
      reset({ text: '' })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box mx={2} pb={3} mt={3}>
      <Typography color="secondary" variant="body1">
        Post a Reply
      </Typography>

      <Box
        border={1}
        borderColor="secondary.main"
        borderRadius={5}
        px={1}
        pb={1}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Username"
            name="username"
            defaultValue={data?.currentUser?.username || 'Anonymous'}
            size="small"
            variant="outlined"
            color="secondary"
            margin="normal"
            required
            fullWidth
            inputRef={register}
          />
          <Box my="4px">
            <TextField
              label="Response"
              name="text"
              variant="outlined"
              color="secondary"
              multiline
              required
              fullWidth
              inputRef={register}
            />
          </Box>
          <PostButton
            variant="contained"
            color="secondary"
            disableElevation
            fullWidth
            type="submit"
          >
            Post
          </PostButton>
        </form>
      </Box>
    </Box>
  )
}

const PostButton = styled(Button)`
  margin-top: 8px;
  color: white;
`

export default ResponseForm
