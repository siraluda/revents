import React, { Component } from 'react';
import {connect} from 'react-redux';
import { incrementCounter, decrementCounter } from "./testActions";
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

// this function tells redux what data we want from the store
const mapStatetoProps = (state) => ({
    data: state.test.data
})

// actions allow us to use our reducers to update our state in the store
const actions = {
    incrementCounter,
    decrementCounter
}

class TestComponent extends Component {
    state ={
        latlng: {
            lat: 59.95,
            lng: 30.33
        }
    };

    handleSelect = address => {
        geocodeByAddress(address)
          .then(results => getLatLng(results[0]))
          .then(latlng => this.setState({
              latlng: latlng
          }))
          .catch(error => console.error('Error', error));
      };

    render() {
        const {data, incrementCounter, decrementCounter} = this.props;
        return (
            <div>
                <h1>Test Component</h1>
                <h3>The answer is: {data}</h3>
                <Button onClick={incrementCounter} positive content='Increment'/>
                <Button onClick={decrementCounter} negative content='Decrement'/>
                <br/>
                <br/>
                <TestPlaceInput selectAddress={this.handleSelect} />
                <br/>
                <SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng}/>
            </div>
        )
    }
}

//export default TestComponent;
export default connect(mapStatetoProps, actions)(TestComponent);