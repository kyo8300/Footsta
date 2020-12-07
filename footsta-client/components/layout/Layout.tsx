import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useTheme } from '@material-ui/core/styles'
import Navbar from './Navbar'
import ScrollTop from './ScrollTop'

const Layout: React.FC = ({ children }) => {
  const theme = useTheme()

  return (
    <DefaultLayout bgcolor={theme.palette.primary.main}>
      <Navbar />
      <BackToTop id="back-to-top-anchor" />
      {children}
      <ScrollTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon color="primary" />
        </Fab>
      </ScrollTop>
    </DefaultLayout>
  )
}

const DefaultLayout = styled(Box)`
  height: 100%;
  margin: 0;
`

const BackToTop = styled(Toolbar)`
  min-height: 30px;
`

export default Layout
