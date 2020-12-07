import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'

interface MProps {
  setOpenMenu: (value: React.SetStateAction<boolean>) => void
}

const MobileNavContent: React.FC<MProps> = ({ setOpenMenu }) => {
  return (
    <Box textAlign="center" color="secondary.main" marginY={2}>
      <Link href="/thread/create">
        <a onClick={() => setOpenMenu(false)}>
          <Typography>
            <ThreadIcon />
            Create Thread
          </Typography>
        </a>
      </Link>
    </Box>
  )
}

const ThreadIcon = styled(CreateIcon)`
  vertical-align: -4px;
  margin-right: 3px;
`

export default MobileNavContent
