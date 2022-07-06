import { getTickets } from 'api/ticket/ticket'
import BettingCard from 'components/BettingCard'
import React, { useState, useEffect } from 'react'
import { userId } from 'utilities/common'
import Grid from '@mui/material/Grid'
import { Box } from '@material-ui/core'

const Tickets = () => {
  const [tickets, setTickets] = useState([])
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTickets({ userId: userId() })
        setTickets(response)
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])
  return (
    <Grid
      style={{ marginTop: '35px' }}
      container
      spacing={{ xs: 2, md: 4 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {tickets.map((item, index) => (
        <Grid item xs={4} sm={4} md={4} key={index}>
          <Box
            style={{
              background:
                item.status === 'WIN'
                  ? 'green'
                  : item.status === 'LOST'
                  ? 'red'
                  : 'white',
            }}
          >
            <BettingCard
              id={index}
              name={'Ticket ' + index}
              bets={item.bets}
              status={item.status}
              expectedGain={item.excpectedGain}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  )
}

export default Tickets
