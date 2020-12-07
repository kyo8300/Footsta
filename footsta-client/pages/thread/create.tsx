import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useCreateThreadMutation,
  useCurrentUserQuery,
} from '../../generated/graphql'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

type ThreadInputs = {
  title: string
  text: string
}

const Create: React.FC = () => {
  const router = useRouter()
  const { data } = useCurrentUserQuery()
  useEffect(() => {
    if (!data?.currentUser) {
      router.push('/')
    }
  }, [data])
  const { register, handleSubmit } = useForm<ThreadInputs>()
  const [createThread] = useCreateThreadMutation()
  const onSubmit: SubmitHandler<ThreadInputs> = async (data) => {
    const { title, text } = data
    await createThread({
      variables: {
        title,
        text,
      },
    })

    // Successfully logged in
    router.push('/')
  }

  return (
    <Box>
      <Typography variant="h6" color="secondary">
        Create thread
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register}
          margin="normal"
          required
          fullWidth
          type="text"
          label="Title"
          name="title"
          color="secondary"
        />
        <TextField
          inputRef={register}
          margin="normal"
          required
          fullWidth
          type="text"
          label="Text"
          name="text"
          color="secondary"
          multiline
          variant="outlined"
        />
        <ConfirmButton variant="outlined" color="secondary" type="submit">
          Create
        </ConfirmButton>
      </form>
    </Box>
  )
}

const ConfirmButton = styled(Button)`
  margin-top: 40px;
  margin-bottom: 40px;
  float: right;
`

export default Create
