import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useLoginMutation } from '../generated/graphql'
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

type LoginInputs = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<LoginInputs>()
  const [errorField, setErrorField] = useState({ errorType: '', message: '' })
  const [login] = useLoginMutation()
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    const res = await login({
      variables: {
        email: data.email,
        password: data.password,
      },
    })

    if (res.data?.login.errors) {
      setErrorField({
        errorType: res.data?.login.errors[0].field,
        message: res.data?.login.errors[0].message,
      })
      return
    }

    // Successfully logged in`
    setErrorField({ errorType: '', message: '' })
    router.push('/')
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
            required
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
            inputRef={register}
            error={errorField.errorType === 'email'}
            helperText={
              errorField.errorType === 'email' ? errorField.message : ''
            }
          />
          <TextField
            margin="normal"
            required
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
            inputRef={register}
            error={errorField.errorType === 'password'}
            helperText={
              errorField.errorType === 'password' ? errorField.message : ''
            }
          />
          <ConfirmButton
            variant="outlined"
            fullWidth
            startIcon={<SendIcon />}
            color="secondary"
            type="submit"
          >
            Login
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

export default Login
