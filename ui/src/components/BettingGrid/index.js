import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LooksOneIcon from '@mui/icons-material/LooksOne'
import LooksTwoIcon from '@mui/icons-material/LooksTwo'
import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import { useUserContext } from 'AppContext'

const useStyles = makeStyles(() => ({
  price: {
    color: 'green',
    padding: '1px',
    fontSize: '13px',
  },
  buttonIcon: {
    marginRight: '15px',
    padding: '1px',
  },
}))

const BettingGrid = ({ rows, sport, handleOddClick, disabled }) => {
  const { loggedIn } = useUserContext()
  const classes = useStyles()

  const columnsFootball = [
    {
      field: 'name',
      headerName: 'Event name',
      flex: 2,
      sortable: true,
    },
    {
      field: 'home',
      flex: 1,
      sortable: true,
      headerAlign: 'center',

      align: 'center',

      renderHeader: () => (
        <>
          <LooksOneIcon className={classes.buttonIcon} /> Home
        </>
      ),
      renderCell: (params) => (
        <Button
          spacing={1}
          fullWidth
          disabled={!loggedIn || disabled}
          onClick={() =>
            handleOddClick(
              params.row.id,
              params.row.name,
              params.row.odd.home,
              'home'
            )
          }
        >
          <div className={classes.price}> {params.row.odd.home} KM</div>
        </Button>
      ),
    },
    {
      field: 'tie',
      flex: 1,
      headerAlign: 'center',

      align: 'center',
      sortable: true,
      renderHeader: () => (
        <>
          <CloseIcon className={classes.buttonIcon} />
          Draw
        </>
      ),
      renderCell: (params) => (
        <Button
          spacing={1}
          fullWidth
          disabled={!loggedIn || disabled}
          onClick={() =>
            handleOddClick(
              params.row.id,
              params.row.name,
              params.row.odd.tie,
              'tie'
            )
          }
        >
          <div className={classes.price}> {params.row.odd.tie} KM</div>
        </Button>
      ),
    },
    {
      field: 'odds',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: true,
      renderHeader: () => (
        <>
          <LooksTwoIcon className={classes.buttonIcon} />
          Guest
        </>
      ),
      renderCell: (params) => (
        <Button
          spacing={1}
          fullWidth
          disabled={!loggedIn || disabled}
          onClick={() =>
            handleOddClick(
              params.row.id,
              params.row.name,
              params.row.odd.guest,
              'guest'
            )
          }
        >
          <div className={classes.price}> {params.row.odd.guest} KM</div>
        </Button>
      ),
    },
  ]

  const columnsTennis = [
    {
      field: 'name',
      headerName: 'Event name',
      flex: 2,
      sortable: true,
    },
    {
      field: 'home',
      flex: 1,
      sortable: true,
      headerAlign: 'center',

      align: 'center',
      renderHeader: () => (
        <>
          <LooksOneIcon className={classes.buttonIcon} /> Home
        </>
      ),
      renderCell: (params) => (
        <Button
          spacing={1}
          fullWidth
          disabled={!loggedIn || disabled}
          onClick={() =>
            handleOddClick(
              params.row.id,
              params.row.name,
              params.row.odd.home,
              'home'
            )
          }
        >
          <div className={classes.price}> {params.row.odd.home} KM</div>
        </Button>
      ),
    },
    {
      field: 'odds',
      flex: 1,
      align: 'center',
      headerAlign: 'center',
      sortable: true,
      renderHeader: () => (
        <>
          <LooksTwoIcon className={classes.buttonIcon} />
          Guest
        </>
      ),
      renderCell: (params) => (
        <Button
          spacing={1}
          fullWidth
          disabled={!loggedIn || disabled}
          onClick={() =>
            handleOddClick(
              params.row.id,
              params.row.name,
              params.row.odd.guest,
              'guest'
            )
          }
        >
          <div className={classes.price}> {params.row.odd.guest} KM</div>
        </Button>
      ),
    },
  ]
  return (
    <div
      style={{
        display: 'flex',
        margin: '0 auto',
        height: '95%',
        width: '100%',
        fontSize: '20px',
        paddingBottom: '18px',
      }}
    >
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={sport === 'football' ? columnsFootball : columnsTennis}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sm='auto'
        />
      </div>
    </div>
  )
}

export default BettingGrid
