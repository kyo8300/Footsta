import React from 'react'
import Box from '@material-ui/core/Box'
import { Response as ResponseType } from '../../generated/graphql'
import { displayDate } from '../../utils/formatDate'

type ResponseProps = {
  response: ResponseType
  idx: number
}

const Response: React.FC<ResponseProps> = ({ response, idx }) => {
  return (
    <>
      <Box>
        {idx} : {'Anonymous'} : {displayDate(response.createdAt)}
      </Box>
      <Box ml={1} mt={1} mb={3}>
        {response.text}
      </Box>
    </>
  )
}

export default Response
