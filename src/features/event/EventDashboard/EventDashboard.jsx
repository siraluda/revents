import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { connect } from 'react-redux';
import EventList from '../EventList/EventList'
import { createEvent, deleteEvent, updateEvent } from '../eventActions'
import LoadingComponent from '../../../app/Layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';


const mapState = (state) => ({
  events: state.events,
  loading: state.async.loading
})

const actions = {
  createEvent,
  deleteEvent,
  updateEvent
}


class EventDashboard extends Component {

    handleDeleteEvent = (id) => {
      this.props.deleteEvent(id)
  }

    render() {
        const {events, loading} = this.props;
        if (loading) return <LoadingComponent/>
        return (
            <div>
            <Grid>
                <Grid.Column width={10}>
                    <EventList 
                      events={events} 
                      deleteEvent={this.handleDeleteEvent} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventActivity/>
                </Grid.Column>
            </Grid>
                
            </div>
        )
    }
}

export default connect(mapState, actions)(EventDashboard); // remember concept of closures