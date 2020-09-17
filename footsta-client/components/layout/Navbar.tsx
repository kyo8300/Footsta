import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Slide from '@material-ui/core/Slide'
import MenuIcon from '@material-ui/icons/Menu'

interface Props {
  children: React.ReactElement
}

function HideOnScroll(props: Props) {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  )
}

const Navbar: React.FC = (props) => {
  return (
    <HideOnScroll {...props}>
      <AppBar position="sticky">
        <ToolBar>
          <Hidden smUp>
            <IconButton>
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Box flexGrow={1}>
            <Link href="/">
              <IconButton edge="start" color="inherit">
                <AppLogo src="/images/28x28-icon.png" alt="footsta-logo" />
                <Typography variant="h6">Footsta</Typography>
              </IconButton>
            </Link>
          </Box>
          <AuthButton color="inherit">Login</AuthButton>
          <AuthButton color="inherit">Register</AuthButton>
        </ToolBar>
      </AppBar>
    </HideOnScroll>
  )
}

const AppLogo = styled.img`
  margin-right: 5px;
`

const ToolBar = styled(Toolbar)`
  padding-left: 12px;
  padding-right: 5px;
  @media (max-width: 600px) {
    padding-left: 0px;
    padding-right: 5px;
  }
`
const AuthButton = styled(Button)`
  padding: 6px 3px;
  @media (max-width: 600px) {
    font-size: 13px;
  }
`

export default Navbar
