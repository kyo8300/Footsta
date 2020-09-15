import styled from 'styled-components'
import Button from '@material-ui/core/Button'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  return (
    <>
      <Title>My page</Title>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </>
  )
}
