import React, { Component } from 'react';
import {connect} from 'react-redux';
//import { incrementCounter, decrementCounter } from "./testActions"; Normal Redux
import { incrementAsync, decrementAsync } from "./testActions"; // Redux Thunk
import { Button } from 'semantic-ui-react';
import TestPlaceInput from './TestPlaceInput';
import SimpleMap from './SimpleMap';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { openModal } from "../modals/modalActions";

// this function tells redux what data we want from the store
const mapStatetoProps = (state) => ({
    data: state.test.data,
    loading: state.async.loading,
    buttonName: state.async.elementName
})

// actions allow us to use our reducers to update our state in the store
const actions = {
    //incrementCounter,
    //decrementCounter,
    openModal,
    incrementAsync,
    decrementAsync
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
        const {
            data, 
            //incrementCounter, 
            //decrementCounter,
            incrementAsync,
            decrementAsync, 
            loading,
            buttonName,
            openModal} = this.props;
        return (
            <div>
                <h1>Test Component</h1>
                <h3>The answer is: {data}</h3>
                <Button 
                    name='increment' 
                    loading={buttonName === 'increment' && loading} 
                    onClick={(e) => incrementAsync(e.target.name)} 
                    positive 
                    content='Increment'
                />

                <Button 
                    name='decrement' 
                    loading={buttonName === 'decrement' && loading} 
                    onClick={(e) => decrementAsync(e.target.name)} 
                    negative 
                    content='Decrement'
                />

                <Button 
                    onClick={() => openModal('TestModal', { data: 42 })} 
                    color='teal' 
                    content='Open Modal'    
                />

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