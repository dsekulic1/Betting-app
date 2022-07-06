import React from 'react'
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  useTheme,
  useMediaQuery,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import DrawerComponent from './Drawer'
import { removeSession } from 'utilities/localStorage'
import { useUserContext } from 'AppContext'

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: theme.spacing(10),
  },
  logo: {
    flexGrow: '1',
    cursor: 'pointer',
  },
  icon: {
    width: '300px',
    height: '50px',
    marginRight: '2px',
    marginTop: '5px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '20px',
    marginLeft: theme.spacing(10),
    '&:hover': {
      color: 'yellow',
      borderBottom: '1px solid white',
    },
  },
}))

function Navbar() {
  const classes = useStyles()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { loggedIn } = useUserContext()
  const { setLoggedIn } = useUserContext()
  const handleLogout = () => {
    setLoggedIn(false)
    removeSession()
  }
  return (
    <AppBar position='static'>
      <CssBaseline />
      <Toolbar>
        {isMobile ? (
          <>
            <DrawerComponent />
          </>
        ) : (
          <>
            <div className={classes.navlinks}>
              <Link to='/' className={classes.link}>
                Home
              </Link>

              {!loggedIn ? (
                <Link to='/login' className={classes.link}>
                  Login
                </Link>
              ) : (
                <>
                  <Link to='/events' className={classes.link}>
                    Events
                  </Link>
                  <Link to='/tickets' className={classes.link}>
                    My Tickets
                  </Link>
                  <Link to='/' onClick={handleLogout} className={classes.link}>
                    Signout
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default Navbar
