import React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import BettingItem from 'components/BettingItem'
import BettingResult from 'components/BettingResult'

const BettingCard = ({ id, name, bets, status, expectedGain }) => {
  const textStatus = status === 'UNRESOLVED' ? 'ACTIVE' : status
  return (
    <Card
      key={id}
      style={{
        background:
          status === 'WIN' ? 'green' : status === 'LOST' ? '#CD5C5C' : 'white',
      }}
    >
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name} is {textStatus}
        </Typography>
      </CardContent>
      {bets.map((bet, index) => (
        <BettingItem
          key={index}
          sport={bet.event.sport.name}
          tip={bet.expected}
          value={bet.quota}
          name={bet.event.name}
          wrongResult={bet.event.status}
          wrong={!bet.passed && bet.event.finished}
        />
      ))}
      <BettingResult expectedGain={expectedGain} />
    </Card>
  )
}

export default BettingCard
