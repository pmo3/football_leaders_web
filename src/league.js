import React from "react";
import { Tooltip, Popover } from "@material-ui/core";
import {
  Marker
} from "react-simple-maps";
import StandingsTable from "./standings_table"

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

  render() {
    return (
      <React.Fragment>
        <Marker key={this.props.mapItem.league.country} coordinates={[this.props.mapItem.league.lng, this.props.mapItem.league.lat]} onClick={(i) => this.handleClick(i)}>
          <Tooltip title={this.props.mapItem.leader ? this.props.mapItem.leader.name + " " + this.props.mapItem.league.standings[0].points + "pts" : ""} placement="top">
            <image xlinkHref={this.props.mapItem.leader ? this.props.mapItem.leader.logo_url : ""}
            transform={`translate(-${this.props.mapItem.size /
                              2}, -${this.props.mapItem.size / 2})`}
                          height={this.props.mapItem.size}
                          width={this.props.mapItem.size}/>
          </Tooltip>

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
        <StandingsTable standings={this.props.mapItem.league.standings} league={this.props.mapItem.league}/>
        </Popover>
      </React.Fragment>
    )
  }
};

export default League;
