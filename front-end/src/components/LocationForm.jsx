import React, { Fragment } from 'react';
import { ControlLabel, FormGroup, FormControl, Checkbox, HelpBlock } from 'react-bootstrap';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import PropTypes from 'prop-types';

import { displayValidationError } from '../helpers/validation';

const LocationForm = ({
  location, change, selectCountry, selectRegion, validationErrors,
}) => (
  <Fragment>
    <FormGroup
      controlId="address-control"
      validationState={displayValidationError('address', validationErrors)}
    >
      <ControlLabel>Address</ControlLabel>
      <FormControl
        type="text"
        placeholder="Address line 1"
        name="address"
        value={location.address}
        onChange={change}
      />
      <HelpBlock>{validationErrors.address}</HelpBlock>
    </FormGroup>
    <FormGroup controlId="address2-control">
      <ControlLabel>Address 2</ControlLabel>
      <FormControl
        type="text"
        placeholder="Address line 2"
        name="address_2"
        value={location.address_2}
        onChange={change}
      />
    </FormGroup>
    <FormGroup
      controlId="city-control"
      validationState={displayValidationError('city', validationErrors)}
    >
      <ControlLabel>City</ControlLabel>
      <FormControl
        type="text"
        placeholder="Enter city"
        name="city"
        value={location.city}
        onChange={change}
      />
      <HelpBlock>{validationErrors.city}</HelpBlock>
    </FormGroup>
    <FormGroup
      controlId="zip-code-control"
      validationState={displayValidationError('zip_code', validationErrors)}
    >
      <ControlLabel>Zip Code</ControlLabel>
      <FormControl
        type="text"
        placeholder="Enter Zip code"
        name="zip_code"
        value={location.zip_code}
        onChange={change}
      />
      <HelpBlock>{validationErrors.zip_code}</HelpBlock>
    </FormGroup>
    <FormGroup
      controlId="country-control"
      validationState={displayValidationError('country', validationErrors)}
    >
      <ControlLabel>Country</ControlLabel>
      <CountryDropdown
        name="country"
        valueType="short"
        value={location.country}
        onChange={selectCountry}
      />
      <HelpBlock>{validationErrors.country}</HelpBlock>
    </FormGroup>
    <FormGroup
      controlId="state-region-control"
      validationState={displayValidationError('state_region', validationErrors)}
    >
      <ControlLabel>State or Region</ControlLabel>
      <RegionDropdown
        country={location.country}
        name="state_region"
        countryValueType="short"
        value={location.state_region}
        onChange={selectRegion}
      />
      <HelpBlock>{validationErrors.state_region}</HelpBlock>
    </FormGroup>
    <FormGroup
      controlId="is-hq-control"
      validationState={displayValidationError('is_hq', validationErrors)}
    >
      <Checkbox value={location.is_hq} name="is_hq" onChange={change}>
        Is Headquarter?
      </Checkbox>
      <HelpBlock>{validationErrors.is_hq}</HelpBlock>
    </FormGroup>
  </Fragment>
);

LocationForm.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    address_2: PropTypes.string,
    city: PropTypes.string,
    zip_code: PropTypes.string,
    state_region: PropTypes.string,
    country: PropTypes.string,
    is_hq: PropTypes.bool,
  }).isRequired,
  validationErrors: PropTypes.shape({
    address: PropTypes.string,
    address_2: PropTypes.string,
    city: PropTypes.string,
    zip_code: PropTypes.string,
    state_region: PropTypes.string,
    country: PropTypes.string,
    is_hq: PropTypes.string,
  }).isRequired,
  change: PropTypes.func.isRequired,
  selectCountry: PropTypes.func.isRequired,
  selectRegion: PropTypes.func.isRequired,
};

export default LocationForm;
