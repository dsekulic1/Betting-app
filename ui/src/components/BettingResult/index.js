import React from 'react'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import MoneyIcon from '@mui/icons-material/Money'

const BettingResult = ({ expectedGain }) => {
  const expected = Math.round(expectedGain * 100) / 100
  return (
    <>
      <Divider />
      <ListItem>
        <ListItemIcon style={{ marginLeft: '20px', width: '20%' }}>
          <MoneyIcon />
        </ListItemIcon>
        <ListItemText
          primary={'Expected money:'}
          style={{ marginLeft: '10px' }}
        />
        <ListItemText
          primary={expected + ' KM'}
          style={{ marginLeft: '10px' }}
        />
      </ListItem>
      <Divider />
    </>
  )
}

export default BettingResult
