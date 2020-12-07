import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FCFDFD',
    },
    secondary: {
      main: '#53D9EC',
    },
  },

  overrides: {
    MuiCssBaseline: {
      '@global': {
        a: {
          textDecoration: 'none',
          color: '#53D9EC',
        },
      },
    },
  },
})

export default theme
