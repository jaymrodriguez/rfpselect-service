import React, { Fragment } from 'react';
import { ControlLabel, FormGroup, FormControl, Checkbox, Row, Col, Button } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

class LocationForm extends React.Component {
  state = {
    address: '',
    address_2: '',
    city: '',
    zip_code: '',
    state_region: '',
    country: '',
    is_hq: false,
  };
  handleInputChange = (event) => {
    console.log(event.target);
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };
  render() {
    const {
      address, address_2, city, zip_code, state_region, country, is_hq,
    } = this.state;
    return (
      <Fragment>
        <FormGroup controlId="address-control">
          <ControlLabel>Address</ControlLabel>
          <FormControl
            type="text"
            placeholder="Address line 1"
            name="address"
            value={address}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup controlId="address2-control">
          <ControlLabel>Address 2</ControlLabel>
          <FormControl
            type="text"
            placeholder="Address line 2"
            name="address_2"
            value={address_2}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup controlId="city-control">
          <ControlLabel>City</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter city"
            name="city"
            value={city}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup controlId="zip-code-control">
          <ControlLabel>Zip Code</ControlLabel>
          <FormControl
            type="text"
            placeholder="Enter Zip code"
            name="zip_code"
            value={zip_code}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup controlId="country-control">
          <ControlLabel>Country</ControlLabel>
          <CountryDropdown name="country" value={country} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup controlId="state-region-control">
          <ControlLabel>State or Region</ControlLabel>
          <RegionDropdown
            country={country}
            name="state_region"
            value={state_region}
            onChange={this.handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          {/* <ControlLabel>Is Headquarter?</ControlLabel> */}
          <Checkbox checked={is_hq} name="is_hq" onChange={this.handleInputChange}>
            Is Headquarter?
          </Checkbox>
        </FormGroup>
      </Fragment>
    );
  }
}

export default LocationForm;
