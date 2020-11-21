import React, { useState } from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
import ReplyIcon from '@material-ui/icons/ReplyRounded'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useReplyMutation, GetResponsesDocument } from '../../generated/graphql'

interface ReplyProps {
  responseId: number
  username: string
}

interface ReplyFormProps {
  responseId: number
  text: string
}

const Reply: React.FC<ReplyProps> = ({ responseId, username }) => {
  const [isReply, setIsReply] = useState(false)
  const { register, handleSubmit, reset } = useForm<ReplyFormProps>()
  const [reply] = useReplyMutation()
  const onSubmit: SubmitHandler<ReplyFormProps> = async (data) => {
    try {
      await reply({
        variables: {
          text: data.text,
          responseId,
        },
        update: (store, { data }) => {
          store.modify({
            fields: {
              getResponses(existingResponses = []) {
                const newResponse = store.writeQuery({
                  query: GetResponsesDocument,
                  data: data?.reply,
                })
                return [...existingResponses, newResponse]
              },
            },
          })
        },
      })
      reset({ text: '' })
      setIsReply(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ReplyButton onClick={() => setIsReply(!isReply)}>
        <Box display="inline" style={{ verticalAlign: 'middle' }}>
          <ReplyIcon fontSize="small" />
        </Box>
        <Box display="inline">Reply</Box>
      </ReplyButton>
      {isReply && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box my={1}>
            <TextField
              label={`Reply as "${username}"`}
              name="text"
              variant="outlined"
              color="secondary"
              multiline
              fullWidth
              inputRef={register}
            />
            <Box textAlign="right">
              <CancelButton
                variant="outlined"
                size="small"
                onClick={() => setIsReply(false)}
              >
                Cancel
              </CancelButton>
              <PostReplyButton
                color="secondary"
                variant="contained"
                size="small"
                type="submit"
              >
                Reply
              </PostReplyButton>
            </Box>
          </Box>
        </form>
      )}
    </>
  )
}

const ReplyButton = styled(Box)`
  max-width: 60px;
  cursor: pointer;
`

const PostReplyButton = styled(Button)`
  margin-top: 10px;
  color: white;
`

const CancelButton = styled(Button)`
  margin-top: 10px;
  margin-right: 5px;
  color: black;
`

export default Reply
