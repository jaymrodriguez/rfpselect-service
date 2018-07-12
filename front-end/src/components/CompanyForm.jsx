import React from 'react';
import axios from 'axios';
import { ControlLabel, FormGroup, FormControl, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

import LocationForm from './LocationForm';
import TagSelector from './TagSelector';
import AlertBox from './AlertBox';
import { createCompany, createLocation } from '../services/CompanyService';
import { getResourcing, getCategories, getTechnologies } from '../services/TaxonomyService';
import { STATUS_CODES } from '../helpers/enums';
import { runValidations, companyRules, locationRules } from '../helpers/validation';


import '../css/tags-style.css';

class CompanyForm extends React.Component {
  state = {
    sucess: false,
    resourcesSuggestions: [],
    categoriesSuggestions: [],
    technologiesSuggestions: [],
    name: '',
    url: '',
    foundingDate: '',
    sizeOrganization: 0,
    description: '',
    resources: [],
    categories: [],
    technologies: [],
    validationErrors: [],
    // location: {
    address: '',
    address_2: '',
    city: '',
    zip_code: '',
    state_region: '',
    country: '',
    is_hq: false,
    // },
  };
  async componentDidMount() {
    const results = axios.all([getResourcing(), getCategories(), getTechnologies()]);
    results.then(axios.spread((resources, categories, technologies) => {
      this.setState({
        resourcesSuggestions: resources.data,
        categoriesSuggestions: categories.data,
        technologiesSuggestions: technologies.data,
      });
    }));
  }
  clearForm = () => {
    this.setState({
      resourcesSuggestions: [],
      categoriesSuggestions: [],
      technologiesSuggestions: [],
      name: '',
      url: '',
      foundingDate: '',
      sizeOrganization: 0,
      description: '',
      resources: [],
      categories: [],
      technologies: [],
      validationErrors: [],
    });
  };
  validateInput = (company, location) => {
    const validationErrors = [];
    this.setState({ validationErrors }); // clean previous ones
    const companyErrors = runValidations(company, companyRules);
    const locationErrors = runValidations(location, locationRules);

    validationErrors.concat(companyErrors, locationErrors);
    this.setState({ validationErrors });
    return validationErrors.length < 1;
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    const {
      name,
      url,
      foundingDate,
      sizeOrganization,
      description,
      resources,
      categories,
      technologies,
    } = this.state;

    const company = {
      title: name,
      name,
      url,
      founding_date: moment(foundingDate).format('MM/DD/YYYY'),
      size_of_organization: sizeOrganization,
      description,
      resourcing: resources.map(res => res.id),
      categories: categories.map(cat => cat.id),
      technologies: technologies.map(tech => tech.id),
    };

    const location = this.formatLocationObject();

    const isValid = this.validateInput(company, location);

    if (isValid) {
      const promise = createCompany(company);
      const response = await promise;

      if (response.status !== STATUS_CODES.CREATED) {
        // print validation errors
        const validationErrors = response.data.errors.map(error => `${error.msg} for ${error.param}`);
        this.setState({ validationErrors });
      } else {
        // print sucess
        this.setState({ sucess: true });
        
        console.log(response);
        location.company_id = response.data.id;
        location.title = company.name;
        const locationPromise = createLocation(location);
        await locationPromise;
        this.clearForm();
      }
    } else {
      this.setState({ sucess: false });
    }
  };
  handleInputChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };
  handleSelectCountry = (countryName) => {
    this.setState({ country: countryName });
  };

  handleSelectRegion = (regionName) => {
    this.setState({ state_region: regionName });
  };
  handleAddTag = (tag, stateName) => {
    const tags = [].concat(this.state[stateName], tag);
    this.setState({
      [stateName]: tags,
    });
  };
  handleDeleteTag = (index, stateName) => {
    const tags = this.state[stateName].slice(0); // get local copy of array
    tags.splice(index, 1);
    this.setState({
      [stateName]: tags,
    });
  };
  formatLocationObject = () => {
    const location = {
      address: this.state.address,
      address_2: this.state.address_2,
      city: this.state.city,
      zip_code: this.state.zip_code,
      state_region: this.state.state_region,
      country: this.state.country,
      is_hq: this.state.is_hq,
    };
    return location;
  };
  render() {
    const {
      sucess,
      resourcesSuggestions,
      categoriesSuggestions,
      technologiesSuggestions,
      name,
      url,
      foundingDate,
      sizeOrganization,
      description,
      resources,
      categories,
      technologies,
      validationErrors,
    } = this.state;
    const location = this.formatLocationObject();

    return (
      <Row>
        <Col xs={12} sm={9} md={3} lg={9}>
          {sucess ? <AlertBox title="Company has been created" type="success" /> : null}
          {validationErrors.length > 0 ? (
            <AlertBox title="There are some errors" type="danger" message={validationErrors} />
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="name-control">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="url-control">
              <ControlLabel>URL</ControlLabel>
              <FormControl
                type="url"
                placeholder="Enter URL"
                name="url"
                value={url}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="founding-date-control">
              <ControlLabel>Founding Date</ControlLabel>
              <FormControl
                type="date"
                name="foundingDate"
                value={foundingDate}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="size-organization-control">
              <ControlLabel>Size Of Organization</ControlLabel>
              <FormControl
                type="Number"
                placeholder="Number of members"
                name="sizeOrganization"
                value={sizeOrganization}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <LocationForm location={location} change={this.handleInputChange} selectCountry={this.handleSelectCountry} selectRegion={this.handleSelectRegion} />
            <FormGroup controlId="description-control">
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Company's description"
                name="description"
                value={description}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup controlId="resourcing-control">
              <ControlLabel>Resourcing</ControlLabel>
              <TagSelector
                className="form-control"
                parentStateName="resources"
                tags={resources}
                suggestions={resourcesSuggestions}
                handleAddition={this.handleAddTag}
                handleDelete={this.handleDeleteTag}
              />
            </FormGroup>
            <FormGroup controlId="categories-control">
              <ControlLabel>Categories</ControlLabel>
              <TagSelector
                className="form-control"
                parentStateName="categories"
                tags={categories}
                suggestions={categoriesSuggestions}
                handleAddition={this.handleAddTag}
                handleDelete={this.handleDeleteTag}
              />
            </FormGroup>
            <FormGroup controlId="technologies-control">
              <ControlLabel>Technologies</ControlLabel>
              <TagSelector
                className="form-control"
                parentStateName="technologies"
                tags={technologies}
                suggestions={technologiesSuggestions}
                handleAddition={this.handleAddTag}
                handleDelete={this.handleDeleteTag}
              />
            </FormGroup>
            <Button type="submit" className="btn-send" bsStyle="primary" bsSize="large" block>
              Add Company
            </Button>
          </form>
        </Col>
      </Row>
    );
  }
}

export default CompanyForm;
