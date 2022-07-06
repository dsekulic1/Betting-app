import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Stack from '@mui/material/Stack'
import { getSport } from 'api/sports/sport'
import { getEventsWithParams } from 'api/events/events'
import BettingGrid from 'components/BettingGrid'
import { TextField, Typography } from '@material-ui/core'
import Button from '@mui/material/Button'
import GridHeader from 'components/GridHeader'
import { userId } from 'utilities/common'
import { getUserBalance, updateUserBalance } from 'api/user/user'
import List from '@mui/material/List'
import BettingItem from 'components/BettingItem'
import BettingResult from 'components/BettingResult'
import { addTicket } from 'api/ticket/ticket'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    paddingBottom: '20px',
  },
  grid: {
    height: '100vh',
    marginTop: '10px',
  },

  paperTop: {
    height: '20%',
  },
  paperMain: {
    height: '100vh',
  },
  paperRight: { height: '100vh' },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    background: theme.palette.grey,
  },
  card: {
    padding: '5px',
  },
}))

const HomePage = () => {
  const classes = useStyles()
  const [toggleSport, setToggleSport] = useState('football')
  const [sportId, setSportId] = useState()
  const [searched, setSearched] = useState('')
  const [rows, setRows] = useState([])
  const [balance, setBalance] = useState()
  const [betValue, setBetValue] = useState(0)
  const [bets, setBets] = useState([])
  const [quotes, setQuotes] = useState(0)

  const handleSport = (event, newSport) => {
    if (newSport.length) {
      setToggleSport(newSport)
    }
  }

  const handleOddClick = (id, name, value, tip) => {
    var exists =
      bets.filter((bet) => {
        return bet.id === id
      }).length > 0

    const newElement = {
      id: id,
      name: name,
      quota: value,
      expected: tip,
      sport: toggleSport,
    }

    if (!exists) {
      setQuotes(quotes + value)
      setBets([...bets, newElement])
    } else {
      let newQoutes = value
      let newArray = bets.filter((bet) => {
        if (bet.id !== id) {
          newQoutes = newQoutes + bet.quota
        }
        return bet.id !== id
      })

      setBets([...newArray, newElement])
      setQuotes(newQoutes)
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
        const balanceData = await getUserBalance({ userId: userId() })
        setBalance(balanceData.balance)
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

  const betChange = (event) => {
    if (event.target.value > balance) {
      setBetValue(balance)
    } else {
      setBetValue(event.target.value)
    }
  }

  const cancelSearch = () => {
    setSearched('')
    requestSearch(searched)
  }

  const handleCreateTicket = async () => {
    const expected = betValue * quotes
    const ticket = {
      userId: userId(),
      bet: betValue,
      excpectedGain: expected,
      bets: bets,
    }
    await addTicket(ticket)
    await updateUserBalance(userId(), {
      balance: balance - betValue,
    })
    setBalance(balance - betValue)
    setBetValue(0)
    setQuotes(0)
    setBets([])
  }

  return (
    <div className={classes.root} style={{ paddingBottom: '10px' }}>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item container spacing={1} xs={12}>
          <Grid item xs={8}>
            <Paper className={`${classes.paperMain} ${classes.paper}`}>
              <GridHeader
                searched={searched}
                requestSearch={requestSearch}
                cancelSearch={cancelSearch}
                sport={toggleSport}
                handleSport={handleSport}
              />
              <BettingGrid
                rows={rows}
                sport={toggleSport}
                handleOddClick={handleOddClick}
              />
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper className={`${classes.paperRight} ${classes.paper}`}>
              <Stack spacing={2}>
                <Stack
                  direction='row'
                  spacing={2}
                  justifyContent='center'
                  style={{ marginBottom: '10px' }}
                >
                  <Typography variant='h4' gutterBottom component='div'>
                    Balance: {balance} KM
                  </Typography>
                </Stack>
                <List component='nav' aria-label='ticket bets'>
                  {bets.map((bet) => {
                    return (
                      <BettingItem
                        key={bet.id}
                        id={bet.id}
                        sport={bet.sport}
                        tip={bet.expected}
                        value={bet.quota}
                        name={bet.name}
                      />
                    )
                  })}
                </List>
                <BettingResult expectedGain={quotes * betValue} />
                <Grid
                  container
                  spacing={3}
                  direction='row'
                  alignItems='center'
                  justifyContent='center'
                >
                  <Grid item>
                    <TextField
                      id='outlined-number'
                      label='Bet'
                      type='number'
                      value={betValue}
                      onChange={betChange}
                      inputProps={{
                        min: 0,
                        step: '0.1',
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item style={{ display: 'flex', marginRight: '15px' }}>
                    <Button
                      variant='contained'
                      color='success'
                      onClick={() => handleCreateTicket()}
                    >
                      Create ticket
                    </Button>
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default HomePage
