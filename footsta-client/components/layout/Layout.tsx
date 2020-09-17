import React from 'react'
import styled from 'styled-components'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'

const Layout: React.FC = ({ children }) => {
  const theme = useTheme()
  return (
    <DefaultLayout bgcolor={theme.palette.primary.main}>
      {children}
    </DefaultLayout>
  )
}

const DefaultLayout = styled(Box)`
  height: 100%;
  margin: 0;
`

export default Layout
