import React from 'react'
import Box from '@material-ui/core/Box'
import { useTheme } from '@material-ui/core/styles'

const Layout: React.FC = ({ children }) => {
  const theme = useTheme()
  return <Box bgcolor={theme.palette.primary.main}>{children}</Box>
}

export default Layout
