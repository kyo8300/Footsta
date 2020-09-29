import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useGetThreadQuery } from '../../generated/graphql'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { displayDate } from '../../utils/formatDate'

const Thread: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const threadId = typeof id === 'string' ? parseInt(id) : -1
  const { data } = useGetThreadQuery({
    variables: { threadId },
  })

  return (
    <Box my={3}>
      <Paper elevation={5}>
        <Typography variant="h6" color="secondary">
          <ThreadTitle display="flex" py={2} mx={2}>
            <Box flexGrow={1} mr={1}>
              {data?.getThread?.title}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box ml={2}>{displayDate(data?.getThread?.createdAt)}</Box>
          </ThreadTitle>
        </Typography>
        <Box ml={2} mt={1}>
          <Box>1 : Anonymous : {displayDate(data?.getThread?.createdAt)}</Box>
          <Box ml={1} my={1}>
            {data?.getThread?.text}
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

const ThreadTitle = styled(Box)`
  @media (max-width: 600px) {
    font-size: 18px;
  }
`

export default Thread
