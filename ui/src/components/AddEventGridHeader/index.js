import React from 'react'
import Stack from '@mui/material/Stack'
import SearchBar from 'material-ui-search-bar'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import SportsTennisIcon from '@mui/icons-material/SportsTennis'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Button from '@mui/material/Button'

const AddEventGridHeader = ({
  searched,
  requestSearch,
  cancelSearch,
  sport,
  handleSport,
  onClickResolve,
  onClickAdd,
}) => {
  return (
    <Stack direction='row' spacing={2} style={{ marginBottom: '10px' }}>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        style={{ width: '60%' }}
      />
      <Button
        variant='contained'
        color='success'
        onClick={() => onClickResolve()}
      >
        Resolve events
      </Button>
      <Button
        variant='contained'
        style={{ width: '10%' }}
        onClick={() => onClickAdd()}
      >
        Add event
      </Button>
      <ToggleButtonGroup
        value={sport}
        exclusive
        onChange={handleSport}
        aria-label='sport'
      >
        <ToggleButton value='football' aria-label='football'>
          <SportsSoccerIcon />
          Football
        </ToggleButton>
        <ToggleButton value='tennis' aria-label='tennis'>
          <SportsTennisIcon /> Tennis
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}

export default AddEventGridHeader
