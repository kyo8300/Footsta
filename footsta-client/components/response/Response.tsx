import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import grey from '@material-ui/core/colors/grey'
import { ResponseInfoFragment } from '../../generated/graphql'
import { displayDate } from '../../utils/formatDate'
import Reply from './Reply'

interface ResponseProps {
  response: ResponseInfoFragment & {
    childResponses?: ResponseInfoFragment[]
  }
  idx: number
  currentUser: string
  level: number
}

const Response: React.FC<ResponseProps> = ({
  response,
  idx,
  currentUser,
  level,
}) => {
  return (
    <>
      <ReplyDisplay level={level}>
        <Box color="secondary.main">
          {idx} : {response.user?.username || 'Anonymous'} :{' '}
          {displayDate(response.createdAt)}
        </Box>
        <Box ml={1} mt={1} mb={3}>
          <Box>{response.text}</Box>
          <Box mt={1} color={grey[500]}>
            <Reply username={currentUser} />
          </Box>
        </Box>
        {response.childResponses &&
          response.childResponses.map((childRes, childIdx) => (
            <Response
              key={childRes.id}
              response={childRes}
              idx={++idx}
              currentUser={currentUser}
              level={childIdx === 0 ? ++level : level}
            />
          ))}
      </ReplyDisplay>
    </>
  )
}

const ReplyDisplay = styled(Box)<{ level: number }>`
  margin-right: ${(props) => props.level * 15}px;
  margin-left: ${(props) => props.level * 15}px;
  /* background-color: ${(props) =>
    props.level > 0 && props.level % 2 === 0 ? 'grey' : 'blue'}; */
`

export default Response
