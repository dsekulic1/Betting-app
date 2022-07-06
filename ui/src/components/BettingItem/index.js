import React from 'react'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import CloseIcon from '@mui/icons-material/Close'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'

const BettingItem = ({ sport, tip, value, name, wrongResult, wrong }) => {
  const expectedResult =
    tip === 'home' ? (
      <LooksOneIcon />
    ) : tip === 'tie' ? (
      <CloseIcon />
    ) : (
      <LooksTwoIcon />
    )
  const result =
    wrongResult === 'home' ? (
      <LooksOneIcon />
    ) : wrongResult === 'tie' ? (
      <CloseIcon />
    ) : (
      <LooksTwoIcon />
    )
  const sportFootbal = sport === 'football' || sport === 'Football'
  return (
    <>
      <ListItem>
        <ListItemIcon style={{ marginLeft: '10px' }}>
          {sportFootbal ? <SportsSoccerIcon /> : <SportsTennisIcon />}
        </ListItemIcon>
        <ListItemText
          primary={name}
          style={{ marginLeft: '10px', width: '50%' }}
        />
        <ListItemText
          primary={<ListItemIcon>{expectedResult}</ListItemIcon>}
          secondary={value + ' KM'}
        />
        {wrong && (
          <ListItemText primary={<ListItemIcon>{result}</ListItemIcon>} />
        )}
      </ListItem>
      <Divider />
    </>
  )
}

export default BettingItem
