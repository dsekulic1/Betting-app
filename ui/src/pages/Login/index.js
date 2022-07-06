import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { registerUrl, homeUrl } from 'utilities/appUrls'
import { signIn } from 'api/auth/auth'
import { useUserContext } from 'AppContext'
import { setSession } from 'utilities/localStorage'
import CircularProgress from '@mui/material/CircularProgress'

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href={homeUrl}>
        Betting application
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const theme = createTheme()

export default function SingIn() {
  const history = useHistory()
  const { setLoggedIn, setRole } = useUserContext()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try {
      setLoading(true)

      const response = await signIn(values)
      setRole(response.roles)
      setLoading(false)
      setSession(response)
      history.push('/')
      setLoggedIn(true)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const values = {
      email: data.get('email'),
      password: data.get('password'),
    }
    onFinish(values)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <>
                  Logging in
                  <CircularProgress
                    color='inherit'
                    style={{ marginLeft: '10px', padding: '10px' }}
                  />
                </>
              ) : (
                'Log In'
              )}
            </Button>
            <Grid container justifyContent='center'>
              <Grid item>
                <Link href={registerUrl} variant='body2'>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}
