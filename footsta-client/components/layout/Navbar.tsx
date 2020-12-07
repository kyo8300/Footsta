import React, { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import { useCurrentUserQuery, useLogoutMutation } from '../../generated/graphql'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Hidden from '@material-ui/core/Hidden'
import Slide from '@material-ui/core/Slide'
import MenuIcon from '@material-ui/icons/Menu'
import { makeStyles } from '@material-ui/core/styles'
import MobileNavContent from './MobileNavContent'

const useStyles = makeStyles({
  paper: {
    minWidth: '70%',
  },
  containedSecondary: {
    color: 'white',
    padding: '5px 9px',
    marginRight: '9px',
    '&:hover': {
      backgroundColor: ' #53d9ec',
      color: 'white',
    },
  },
  root: {
    padding: '6px 3px',
    ['@media (max-width: 600px)']: {
      fontSize: '13px',
    },
  },
})

function HideOnScroll(props: { children: React.ReactElement }) {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {props.children}
    </Slide>
  )
}

const Navbar: React.FC = ({ children }) => {
  const classes = useStyles()
  const [openMenu, setOpenMenu] = useState(false)

  const { data, loading } = useCurrentUserQuery()
  const [logout, { client }] = useLogoutMutation()

  return (
    <HideOnScroll {...children}>
      <AppBar position="sticky">
        <ToolBar>
          <Hidden smUp>
            <IconButton onClick={() => setOpenMenu(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              open={openMenu}
              onClose={() => setOpenMenu(false)}
              classes={{ paper: classes.paper }}
            >
              <MobileNavContent setOpenMenu={setOpenMenu} />
            </Drawer>
          </Hidden>
          <Box flexGrow={1}>
            <Link href="/" passHref>
              <TopTag>
                <IconButton edge="start" color="inherit">
                  <AppLogo src="/images/28x28-icon.png" alt="footsta-logo" />
                  <Typography variant="h6" color="textPrimary">
                    Footsta
                  </Typography>
                </IconButton>
              </TopTag>
            </Link>
          </Box>
          {loading ? (
            <LoadingBox>Loading...</LoadingBox>
          ) : data?.currentUser ? (
            <>
              <Hidden xsDown>
                <Link href="/thread/create" passHref>
                  <Button
                    component="a"
                    size="small"
                    variant="contained"
                    color="secondary"
                    classes={{
                      containedSecondary: classes.containedSecondary,
                    }}
                  >
                    Create Thread
                  </Button>
                </Link>
              </Hidden>

              <Button
                color="secondary"
                onClick={() => {
                  logout()
                  client.resetStore()
                }}
                classes={{
                  root: classes.root,
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button
                  component="a"
                  color="secondary"
                  classes={{
                    root: classes.root,
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button
                  component="a"
                  color="secondary"
                  classes={{
                    root: classes.root,
                  }}
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </ToolBar>
      </AppBar>
    </HideOnScroll>
  )
}

const LoadingBox = styled.div`
  margin-right: 7px;
`

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
const TopTag = styled.a`
  text-decoration: none;
`

export default Navbar
