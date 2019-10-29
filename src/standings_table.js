import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'

class StandingsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: this.createRows(this.props.standings)
    }
  }

  createRows(standingsJSON) {
    const rows = standingsJSON.map(row => this.createData(row.rank, row.team.name, row.points))
    return rows
  }

  createData(rank, teamName, points) {
    return {rank, teamName, points}
  }

  render() {
    return (
      <div class="table-container">
        <Typography variant="h5">{this.props.league.country + " - " + this.props.league.name}</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row => (
              <TableRow key={row.teamName}>
                <TableCell component="th" scope="row">{row.rank}</TableCell>
                <TableCell>{row.teamName}</TableCell>
                <TableCell align="right">{row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default StandingsTable;
