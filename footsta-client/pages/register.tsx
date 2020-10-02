import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useForm, SubmitHandler } from 'react-hook-form'
import {
  useRegisterMutation,
  useCurrentUserQuery,
  CurrentUserDocument,
} from '../generated/graphql'
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
  const router = useRouter()
  const { data } = useCurrentUserQuery()
  useEffect(() => {
    if (data?.currentUser) {
      router.push('/')
    }
  }, [data])

  const { register: formRegister, handleSubmit, errors } = useForm<
    RegisterInputs
  >()
  const [errorField, setErrorField] = useState({ errorType: '', message: '' })
  const [register] = useRegisterMutation()
  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorField({ errorType: 'password', message: 'Password not matched.' })
      return
    }
    const res = await register({
      variables: {
        username: data.username,
        password: data.password,
        email: data.email,
      },
      update: (store, { data }) => {
        store.writeQuery({
          query: CurrentUserDocument,
          data: {
            __typename: 'Query',
            currentUser: data?.register.user,
          },
        })
      },
    })

    if (res.data?.register.errors) {
      setErrorField({
        errorType: res.data?.register.errors[0].field,
        message: res.data?.register.errors[0].message,
      })
      return
    }

    // Successfully Registered
    setErrorField({ errorType: '', message: '' })
    router.back()
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
            type="text"
            label="Username (2 ~ 20 characters)"
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
            error={
              errors.username?.type === 'maxLength' ||
              errors.username?.type === 'minLength'
            }
          />
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
            inputRef={formRegister}
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
            inputRef={formRegister}
            error={errorField.errorType === 'password'}
            helperText={
              errorField.errorType === 'password' ? errorField.message : ''
            }
          />
          <TextField
            margin="normal"
            required
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
