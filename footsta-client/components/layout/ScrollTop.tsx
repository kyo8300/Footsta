import React from 'react'
import styled from 'styled-components'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Zoom from '@material-ui/core/Zoom'

interface Props {
  children: React.ReactElement
}

function ScrollTop(props: Props) {
  const trigger = useScrollTrigger()

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <BackIcon onClick={handleClick} role="presentation">
        {props.children}
      </BackIcon>
    </Zoom>
  )
}

const BackIcon = styled.div`
  position: fixed;
  bottom: 15px;
  right: 15px;
`

export default ScrollTop
