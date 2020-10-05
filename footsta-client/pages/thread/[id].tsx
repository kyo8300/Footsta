import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  useGetThreadQuery,
  useGetResponsesQuery,
} from '../../generated/graphql'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { displayDate } from '../../utils/formatDate'
import Response from '../../components/response/Response'
import ResponseForm from '../../components/response/ResponseForm'

const Thread: React.FC = () => {
  const fineTuneResID = 2
  const router = useRouter()
  const { id } = router.query
  const threadId = typeof id === 'string' ? parseInt(id) : -1
  const { data: threadData } = useGetThreadQuery({
    variables: { threadId },
  })
  const { data: responseData } = useGetResponsesQuery({
    variables: { threadId },
  })

  return (
    <Box my={3}>
      <Paper elevation={5}>
        <Typography variant="h6" color="secondary">
          <ThreadTitle display="flex" py={2} mx={2}>
            <Box flexGrow={1} mr={1}>
              {threadData?.getThread?.title}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box ml={2}>{displayDate(threadData?.getThread?.createdAt)}</Box>
          </ThreadTitle>
        </Typography>
        <Box mx={2} mt={1}>
          <Box>
            1 : {threadData?.getThread?.owner.username || 'Anonymous'} :{' '}
            {displayDate(threadData?.getThread?.createdAt)}
          </Box>
          <Box ml={1} mt={1} mb={3}>
            {threadData?.getThread?.text}
          </Box>
          {responseData?.getResponses?.map((response, idx) => (
            <Response
              key={response.id}
              response={response}
              idx={idx + fineTuneResID}
            />
          ))}
        </Box>
        <ResponseForm threadId={threadId} />
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
