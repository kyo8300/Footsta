import React, { useState } from 'react'
import styled from 'styled-components'
import ReplyIcon from '@material-ui/icons/ReplyRounded'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

interface ReplyProps {
  username: string
}

const Reply: React.FC<ReplyProps> = ({ username }) => {
  const [isReply, setIsReply] = useState(false)
  return (
    <>
      <ReplyButton onClick={() => setIsReply(!isReply)}>
        <Box display="inline" style={{ verticalAlign: 'middle' }}>
          <ReplyIcon fontSize="small" />
        </Box>
        <Box display="inline">Reply</Box>
      </ReplyButton>
      {isReply && (
        <Box my={1}>
          <TextField
            label={`Reply to a response as "${username}"`}
            name="text"
            variant="outlined"
            color="secondary"
            multiline
            fullWidth
          />
          <Box textAlign="right">
            <CancelButton
              variant="outlined"
              size="small"
              onClick={() => setIsReply(false)}
            >
              Cancel
            </CancelButton>
            <PostReplyButton color="secondary" variant="contained" size="small">
              Reply
            </PostReplyButton>
          </Box>
        </Box>
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
