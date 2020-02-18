/*global google*/
import React, { Component } from 'react'
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { createEvent, updateEvent } from '../eventActions';
import { reduxForm, Field } from 'redux-form';
import cuid from 'cuid';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from "revalidate";
import PlaceInput from '../../../app/common/form/PlaceInput';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};


  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0]
  }

  return {
    initialValues: event
  }
}

const actions = {
  createEvent,
  updateEvent
}

const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired({message: 'the category is required'}),
  description: composeValidators(
    isRequired({message: 'Please enter description'}),
    hasLengthGreaterThan(4)({message: 'Text length needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')
})

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

class EventForm extends Component {
  // local state for the selected city's latitude and langitude coordinates
  state = {
    cityLatLng: {},
    venueLatLng: {}
  }

  createUpdateForm = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.push(`/events/${this.props.initialValues.id}`);
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: '/assets/user.png',
        hostedBy: 'Bob'
      }
      this.props.createEvent(newEvent);
      this.props.history.push(`/events/${newEvent.id}`);
    }  
  };

  handleCitySelect = selectedCity => {
    // this function allows us to get the lat and long cooordinates to allow us to narrow down the venue to that city
    geocodeByAddress(selectedCity)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          cityLatLng: latlng
        })
      })
      .then(() => {this.props.change('city', selectedCity)} )
  }

  handleVenueSelect = selectedVenue => {
    geocodeByAddress(selectedVenue)
      .then(results => getLatLng(results[0]))
      .then(latlng => {
        this.setState({
          venueLatLng: latlng
        })
      })
      .then(() => {this.props.change('venue', selectedVenue)} )
  }
  
    render() {

      const { history, initialValues, invalid, submitting, pristine } = this.props

        return (
          <Grid>
            <Grid.Column width={10} >
            <Segment>
              <Header sub color='teal' content="Event Details" />
                <Form onSubmit= {this.props.handleSubmit(this.createUpdateForm)} autoComplete="off" >
                  <Field 
                    name='title' 
                    component={TextInput} 
                    placeholder='Give your event name'/>
                  <Field 
                    name='category' 
                    component={SelectInput}
                    options={category} 
                    placeholder='What is your event about?'/>
                  <Field 
                    name='description' 
                    rows={3} 
                    component={TextArea} 
                    placeholder='Tell us about your event'/>
                  <Header sub color='teal' content='Event Location Details' />
                  <Field 
                    name='city' 
                    component={PlaceInput}
                    options={{types: ['(cities)']}} // this 'cities' type collection is from the Places API, which restricts search to only cities. 
                    onSelect={this.handleCitySelect}
                    placeholder='Event City'/>
                  <Field 
                    name='venue' 
                    component={PlaceInput}
                    options={{ //check places api documentation
                      location: new google.maps.LatLng(this.state.cityLatLng), // remember to add global google astericks
                      radius: 1000,
                      types:['establishment']
                    }} 
                    onSelect={this.handleVenueSelect}
                    placeholder='Event Venue'/>
                  <Field 
                    name='date' 
                    component={DateInput}
                    dataFormat = 'MM/dd/yyyy h:mm a' 
                    showTimeSelect // this will allow us to use the time picker
                    timeFormat= "HH:mm"
                    placeholder='Event Date'/>
                  <Button disabled={invalid || submitting || pristine} positive type="submit">
                    Submit
                  </Button>
                  <Button onClick={initialValues.id 
                  ? () => history.push(`/events/${initialValues.id}`) 
                  : () => history.push('/events') 
                  } type="button">Cancel</Button>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid>
        )
    }
}

export default connect(mapState, actions)(reduxForm({form: 'eventForm', validate})(EventForm)); 