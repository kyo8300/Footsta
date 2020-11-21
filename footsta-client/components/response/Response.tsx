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
  /* background-color: ${({ level }) =>
    level > 0 ? (level % 2 === 0 ? 'white' : 'whitesmoke') : 'inherit'}; */

  padding-left: ${({ level }) => (level > 0 ? '10' : '0')}px;

  /* padding-left: ${({ level }) =>
    level === 1 ? level * 10 : level * 3}px; */
  padding-right: ${({ level }) => (level === 1 ? level * 10 : level * 3)}px;
  border-left: ${({ level }) => (level > 0 ? '1px solid grey' : '')};
`

export default Response
