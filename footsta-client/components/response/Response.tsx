import React from 'react'
import Box from '@material-ui/core/Box'
import { Response as ResponseType, User } from '../../generated/graphql'
import { displayDate } from '../../utils/formatDate'
import { Override } from '../../utils/customType'

interface ResponseProps {
  response: Override<ResponseType, { user?: Pick<User, 'username'> | null }>
  idx: number
}

const Response: React.FC<ResponseProps> = ({ response, idx }) => {
  return (
    <>
      <Box color="secondary.main">
        {idx} : {response.user?.username || 'Anonymous'} :{' '}
        {displayDate(response.createdAt)}
      </Box>
      <Box ml={1} mt={1} mb={3}>
        {response.text}
      </Box>
    </>
  )
}

export default Response
