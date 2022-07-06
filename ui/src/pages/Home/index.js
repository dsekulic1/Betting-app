import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { getSport } from 'api/sports/sport'
import { getEventsWithParams } from 'api/events/events'
import BettingGrid from 'components/BettingGrid'
import GridHeader from 'components/GridHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingBottom: '20px',
  },
  grid: {
    height: '100vh',
    marginTop: '10px',
  },
  paperMain: {
    margin: 'auto',
    height: '100vh',
    width: '70%',
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.grey,
  },
  card: {
    padding: '5px',
  },
}))

const Home = () => {
  const classes = useStyles()
  const [toggleSport, setToggleSport] = useState('football')
  const [sportId, setSportId] = useState()
  const [searched, setSearched] = useState('')
  const [rows, setRows] = useState([])

  const handleSport = (event, newSport) => {
    if (newSport.length) {
      setToggleSport(newSport)
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setSearched('')
        const response = (await getSport({ name: toggleSport }))[0]
        const eventsData = await getEventsWithParams({
          sportId: response.id,
        })
        setRows(eventsData)
        setSportId(response.id)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [toggleSport])

  const requestSearch = async (searchedVal) => {
    const eventsData = await getEventsWithParams({
      sportId: sportId,
      name: searchedVal,
    })
    setRows(eventsData)
  }

  const cancelSearch = () => {
    setSearched('')
    requestSearch(searched)
  }
  return (
    <div className={classes.root} style={{ paddingBottom: '10px' }}>
      <Grid container spacing={1} className={classes.grid}>
        <Paper className={`${classes.paperMain} ${classes.paper}`}>
          <GridHeader
            searched={searched}
            requestSearch={requestSearch}
            cancelSearch={cancelSearch}
            sport={toggleSport}
            handleSport={handleSport}
          />
          <BettingGrid rows={rows} sport={toggleSport} />
        </Paper>
      </Grid>
    </div>
  )
}

export default Home
