import React, { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@material-ui/core/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { getSport } from 'api/sports/sport'
import { addEvent } from 'api/events/events'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const sports = [
  {
    value: 'Football',
    label: 'Football',
  },
  {
    value: 'Tennis',
    label: 'Tennis',
  },
]
export default function AddEventModal({ open, setOpen }) {
  const [sport, setSport] = useState('Football')
  const [eventName, setEventName] = useState('')
  const [betValueHome, setBetValueHome] = useState(0)
  const [betValueTie, setBetValueTie] = useState(0)
  const [betValueGuest, setBetValueGuest] = useState(0)

  const betValueHomeChange = (event) => {
    setBetValueHome(event.target.value)
  }
  const betValueTieChange = (event) => {
    setBetValueTie(event.target.value)
  }
  const betValueGuestChange = (event) => {
    setBetValueGuest(event.target.value)
  }
  const handleClose = () => setOpen(false)

  const handleSubmit = async () => {
    const response = (await getSport({ name: sport }))[0]
    const values = {
      name: eventName,
      sportId: response.id,
      odds: {
        home: betValueHome,
        tie: sport === 'Football' ? betValueTie : null,
        guest: betValueGuest,
      },
    }
    try {
      await addEvent(values)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleChangeSport = (event) => {
    setSport(event.target.value)
  }
  const handleChangeEventName = (event) => {
    setEventName(event.target.value)
  }

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Container component='main'>
              <Box
                component='form'
                sx={{
                  borderRadius: '5px',
                  backgroundColor: '#FFFAFA',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '5px',
                }}
                noValidate
              >
                <div>
                  <TextField
                    select
                    label='Select'
                    value={sport}
                    onChange={handleChangeSport}
                    helperText='Please select sport'
                  >
                    {sports.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    input
                    label='Input event name'
                    value={eventName}
                    onChange={handleChangeEventName}
                    style={{ marginLeft: '5px' }}
                    helperText='Please input event name'
                  />
                </div>
                <div
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <TextField
                    label='Home'
                    type='number'
                    value={betValueHome}
                    onChange={betValueHomeChange}
                    inputProps={{
                      min: 0,
                      step: '0.1',
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {sport === 'Football' && (
                    <TextField
                      label='Draw'
                      type='number'
                      value={betValueTie}
                      onChange={betValueTieChange}
                      inputProps={{
                        min: 0,
                        step: '0.1',
                      }}
                      style={{ marginLeft: '5px' }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}

                  <TextField
                    label='Guest'
                    type='number'
                    value={betValueGuest}
                    onChange={betValueGuestChange}
                    inputProps={{
                      min: 0,
                      step: '0.1',
                    }}
                    style={{ marginLeft: '5px' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <ButtonGroup
                  style={{
                    marginTop: '10px',
                    width: '100%',
                    displey: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Button
                    onClick={handleClose}
                    variant='contained'
                    style={{
                      backgroundColor: 'red',
                      marginTop: '1%',

                      width: '90%',
                      color: '#ffff',
                      borderRadius: '10',
                    }}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant='contained'
                    style={{
                      backgroundColor: 'green',
                      marginTop: '1%',
                      marginLeft: '20px',
                      width: '90%',
                      color: '#ffff',
                      borderRadius: '10',
                    }}
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Submit
                  </Button>
                </ButtonGroup>
              </Box>
            </Container>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
