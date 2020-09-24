import React from 'react'
import styled from 'styled-components'
import { useGetThreadsQuery } from '../../generated/graphql'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { Box } from '@material-ui/core'
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined'
import { displayDate } from '../../utils/formatDate'

const MainThread: React.FC = () => {
  const { data } = useGetThreadsQuery()

  return (
    <Paper elevation={5}>
      <Box display="flex">
        <ThemeDisplay variant="h6" color="secondary">
          Thread
        </ThemeDisplay>
        <ViewAll>View All</ViewAll>

        <ArrowBox>
          <ArrowForwardIosOutlinedIcon style={{ fontSize: 10 }} />
        </ArrowBox>
      </Box>

      <Divider />
      <Box>
        {data?.getThreads?.map((thread) => (
          <ThreadBox key={thread.id}>
            <TitleDisplay>
              <Typography variant="body2">Mike</Typography>
              <Typography variant="subtitle1" color="secondary">
                {thread.title}
              </Typography>
              <DateBox>{displayDate(thread.createdAt)}</DateBox>
            </TitleDisplay>
          </ThreadBox>
        ))}
      </Box>
    </Paper>
  )
}

const ThreadBox = styled(Box)`
  &:hover {
    background-color: rgba(220, 220, 220, 0.3);
  }
`

const ThemeDisplay = styled(Typography)`
  padding: 8px 0;
  margin-left: 20px;
  flex-grow: 1;
`

const TitleDisplay = styled(Box)`
  /* border: solid; */
  padding: 8px 0;
  margin-left: 20px;
  margin-right: 15px;
`
const ViewAll = styled(Box)`
  justify-content: center;
  margin: auto;
  margin-right: 5px;
`
const DateBox = styled(Box)`
  text-align: end;
  margin-top: 5px;
`

const ArrowBox = styled(Box)`
  margin: auto;
  margin-right: 8px;
  justify-content: center;
`

export default MainThread
