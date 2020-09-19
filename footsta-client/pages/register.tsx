import React from 'react'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
// import { useRegisterMutation } from '../generated/graphql'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import Box from '@material-ui/core/Box'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined'
import SendIcon from '@material-ui/icons/Send'
import EmailIcon from '@material-ui/icons/Email'
import LockIcon from '@material-ui/icons/Lock'
import AccountCircle from '@material-ui/icons/AccountCircle'

type RegisterInputs = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const { register: formRegister, handleSubmit } = useForm<RegisterInputs>()
  //   const [register] = useRegisterMutation()
  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    if (data.password !== data.confirmPassword) {
      console.log('Weepr')
      return
    }
    console.log(data)
  }

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box textAlign="center" marginTop="50px">
        <VpnKeyOutlinedIcon fontSize="large" color="secondary" />
        <Typography variant="h6" color="secondary">
          Sign In
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            // required
            fullWidth
            type="text"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="secondary" />
                </InputAdornment>
              ),
            }}
            inputRef={formRegister({ minLength: 2, maxLength: 20 })}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            inputRef={formRegister}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            type="password"
            label="Password"
            name="password"
            autoComplete="new-password"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            inputRef={formRegister}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            autoComplete="new-password"
            color="secondary"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="secondary" />
                </InputAdornment>
              ),
            }}
            inputRef={formRegister}
          />
          <ConfirmButton
            variant="outlined"
            fullWidth
            startIcon={<SendIcon />}
            color="secondary"
            type="submit"
          >
            Sign in
          </ConfirmButton>
        </form>
      </Box>
    </Container>
  )
}

const ConfirmButton = styled(Button)`
  margin-top: 40px;
  margin-bottom: 40px;
`

export default Register
