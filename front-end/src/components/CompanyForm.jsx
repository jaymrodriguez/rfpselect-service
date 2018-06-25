import React from 'react';
import axios from 'axios';
import { ControlLabel, FormGroup, FormControl, Row, Col, Button } from 'react-bootstrap';
import validator from 'validator';
import moment from 'moment';

import TagSelector from './TagSelector';
import AlertBox from './AlertBox';
import { createCompany } from '../services/CompanyService';
import { getResourcing, getCategories, getTechnologies } from '../services/TaxonomyService';
import { STATUS_CODES } from '../helpers/enums';

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
  validateInput = (fields) => {
    const validationErrors = [];
    this.setState({ validationErrors }); // clean previous ones

    const rules = {
      name: name =>
        (validator.isLength(name, { min: 2, max: 255 })
          ? false
          : 'Name should be between 2 and 255 letters.'),
      url: url => (validator.isURL(url) ? false : 'URL must be valid.'),
      founding_date: date => (date !== 'Invalid date' ? false : 'Invalid date format.'),
      size_of_organization: size =>
        (size > 3 ? false : 'Organization must have at least 4 members.'),
      description: desc => (!validator.isEmpty(desc) ? false : "Description can't be empty"),
      resourcing: res => (res.length > 0 ? false : 'Must have at least one resourcing option.'),
      categories: cat => (cat.length > 0 ? false : 'Must have at least one category option.'),
      technologies: tech => (tech.length > 0 ? false : 'Must have at least one technology option'),
    };

    Object.keys(rules).forEach((fieldName) => {
      const error = rules[fieldName].call(null, fields[fieldName]);
      if (error) {
        validationErrors.push(error);
      }
    });
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

    const isValid = this.validateInput(company);

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
        this.clearForm();
      }
    } else {
      this.setState({ sucess: false });
    }
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
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
