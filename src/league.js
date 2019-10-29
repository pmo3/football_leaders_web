import React from "react";
import {
  Tooltip,
  Popover,
  createMuiTheme,
  MuiThemeProvider,
 } from "@material-ui/core";
import {
  Marker
} from "react-simple-maps";
import StandingsTable from "./standings_table"

const theme = createMuiTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
      }
    }
  }
});

class League extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      id: "simple-popover"
    }
  }

  handleClick = function(event) {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = function(i) {
    this.setState({
      anchorEl: null
    })
  }

  mapItem() {
    return this.props.mapItem;
  }

  league() {
    return this.mapItem().league;
  }

  tooltipTitle() {
    return this.mapItem().leader ? this.mapItem().leader.name + " " + this.league().standings[0].points + "pts" : ""
  }

  render() {
    return (
      <React.Fragment>
        <Marker key={this.league().country} coordinates={[this.league().lng, this.league().lat]} onClick={(i) => this.handleClick(i)}>
          <MuiThemeProvider theme={theme}>
          <Tooltip title={this.tooltipTitle()} placement="top">
            <image className="mapImage" xlinkHref={this.props.mapItem.leader ? this.props.mapItem.leader.logo_url : ""}
            transform={`translate(-${this.mapItem().size /
                              2}, -${this.mapItem().size / 2})`}
                          height={this.mapItem().size}
                          width={this.mapItem().size}/>
          </Tooltip>
          </MuiThemeProvider>
        </Marker>
        <Popover
        id={this.state.id}
        open={Boolean(this.state.anchorEl)}
        anchorEl={this.state.anchorEl}
        onClose={(i) => this.handleClose(i)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
        <StandingsTable standings={this.league().standings} league={this.league()}/>
        </Popover>
      </React.Fragment>
    )
  }
};

export default League;
