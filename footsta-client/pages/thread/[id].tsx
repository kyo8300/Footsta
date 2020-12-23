import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  useGetThreadQuery,
  useGetResponsesQuery,
  useCurrentUserQuery,
} from '../../generated/graphql'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { displayDate } from '../../utils/formatDate'
import Response from '../../components/response/Response'
import ResponseForm from '../../components/response/ResponseForm'

const Thread: React.FC = () => {
  const fineTuneIdx = 2
  const [fetchNum, setFetchNum] = useState(1)
  const router = useRouter()
  const { id: paramsId } = router.query
  const threadId = typeof paramsId === 'string' ? parseInt(paramsId) : -1
  const { data: threadData } = useGetThreadQuery({
    variables: { threadId },
  })
  const { data: responseData, fetchMore } = useGetResponsesQuery({
    variables: { threadId },
  })

  const lastCursor =
    responseData?.getResponses.responses[
      responseData.getResponses.responses.length - 1
    ].createdAt || ''
  const { data: userData } = useCurrentUserQuery()
  const username = userData?.currentUser?.username || 'Anonymous'

  const loader = useRef<HTMLDivElement>(null)
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]

      if (target.isIntersecting && responseData?.getResponses.hasMore) {
        if (responseData) {
          fetchMore({
            variables: {
              threadId,
              cursor:
                responseData.getResponses.responses[
                  responseData.getResponses.responses.length - 1
                ].createdAt,
            },
          })
          setFetchNum((fetchNum) => fetchNum + 1)
        }
      }
    },
    [fetchMore, threadId, responseData]
  )
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '10px',
      threshold: 1.0,
    }
    const observer = new IntersectionObserver(handleObserver, options)
    const node = loader.current
    if (node) {
      observer.observe(node)
      return () => {
        observer.unobserve(node)
      }
    }
  }, [handleObserver])

  return (
    <Box my={3}>
      <Paper elevation={5}>
        <Typography variant="h6" color="secondary">
          <ThreadTitle display="flex" py={2} mx={2}>
            <Box flexGrow={1} mr={1}>
              {threadData?.getThread?.title}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box ml={2}>
              {displayDate(threadData?.getThread?.createdAt, false)}
            </Box>
          </ThreadTitle>
        </Typography>
        <ResponseForm
          threadId={threadId}
          username={username}
          lastCursor={lastCursor}
        />
        <Box mx={2} mt={1} pb={2}>
          <Box>
            1 : {threadData?.getThread?.owner.username || 'Anonymous'} :{' '}
            {displayDate(threadData?.getThread?.createdAt)}
          </Box>
          <Box ml={1} mt={1} mb={3}>
            {threadData?.getThread?.text}
          </Box>
          {responseData?.getResponses.responses.map((response, idx) => {
            return (
              <Response
                key={response.id}
                response={response}
                idx={idx + fineTuneIdx}
                currentUser={username}
                level={0}
                fetchNum={fetchNum}
              />
            )
          })}
          {responseData?.getResponses.hasMore && (
            <div ref={loader}>
              <Box textAlign="center">Loading...</Box>
            </div>
          )}
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
