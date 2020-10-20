import React from 'react'
import Box from '@material-ui/core/Box'
import MainThread from '../components/thread/MainThread'

export default function Index() {
  return (
    <>
      <Box>
        <MainThread />
        {/* {[...new Array(12)]
            .map(
              () =>
                `Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')} */}
      </Box>
    </>
  )
}
