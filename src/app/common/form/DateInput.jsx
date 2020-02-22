import React from 'react';
import { Form, Label } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateInput = ({input, width, placeholder, meta: {touched, error}, ...rest}) => {
    return (
        <Form.Field error={touched && !!error}>
            <DatePicker 
                {...rest} // spreading all the date-picker props. check docs
                placeholderText={placeholder}
                selected={input.value ? new Date(input.value) : null} // converting the date into a javascript object
                onChange={input.onChange} // this will make redux form aware of any changes
                onBlur={input.onBlur} // this will prompt validation check when we click in and out of the date field
                onChangeRaw={(e)=> e.preventDefault()} // this prevents the user from typing into the date field
            />
            {touched && error && <Label basic color='red'>{error}</Label>}
        </Form.Field>
    );
};

export default DateInput;

