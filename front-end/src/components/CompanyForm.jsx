import React from 'react';
import axios from 'axios';
import { ControlLabel, FormGroup, FormControl, Row, Col, Button } from 'react-bootstrap';
import TagSelector from './TagSelector';
import { getResourcing, getCategories, getTechnologies } from '../services/TaxonomyService';

import '../css/tags-style.css';

class CompanyForm extends React.Component {
  state = {
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
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.description.value);
  };
  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };
  handleAddTag = (tag, stateName) => {
    // const {technologies} = this.state;
    const tags = [].concat(this.state[stateName], tag);
    this.setState({
      [stateName]: tags,
    });
  };
  render() {
    const {
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
    } = this.state;
    return (
      <Row>
        <Col xs={12} sm={9} md={3} lg={9}>
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
              />
            </FormGroup>
            <Button type="submit" className="btn-send">
              Submit
            </Button>
          </form>
        </Col>
      </Row>
    );
  }
}

export default CompanyForm;
