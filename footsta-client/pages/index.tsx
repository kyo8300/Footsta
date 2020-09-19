import React from 'react'
import Box from '@material-ui/core/Box'
import ScrollTop from '../components/layout/ScrollTop'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'

export default function Index() {
  return (
    <>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box>Main</Box>
        <Box>Footer</Box>
        <Box>
          {[...new Array(12)]
            .map(
              () =>
                `Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </Box>
      </Container>
      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  )
}
