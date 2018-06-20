import React from 'react';
import axios from 'axios';
import TagSelector from './TagSelector';
import { getResourcing, getCategories, getTechnologies } from '../services/TaxonomyService';

class CompanyForm extends React.Component {
  state = {
    resources: [],
    categories: [],
    technologies: [],
  };
  async componentDidMount() {
    const results = axios.all([getResourcing(), getCategories(), getTechnologies()]);
    results.then(axios.spread((resources, categories, technologies) => {
      this.setState({
        resources: resources.data,
        categories: categories.data,
        technologies: technologies.data,
      });
    }));
  }
  render() {
    const { resources, categories, technologies } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Name:
          <input type="text" id="name" name="name" />
        </label>
        <label htmlFor="url">
          URL:
          <input type="url" name="url" />
        </label>
        <label htmlFor="founding-date">
          Founding Date:
          <input type="date" name="founding-date" />{' '}
        </label>
        <label htmlFor="size-organization">
          Size Of Organization:
          <input type="number" name="size-organization" />{' '}
        </label>
        <label htmlFor="description">
          Description:
          <textarea name="description" rows="10" cols="30" />{' '}
        </label>
        <label htmlFor="resourcing">
          Resourcing:
          <TagSelector suggestions={resources} />
        </label>
        <label htmlFor="categories">
          Categories:
          <TagSelector suggestions={categories} />
        </label>
        <label htmlFor="technologies">
          Technologies:
          <TagSelector suggestions={technologies} />
        </label>
      </form>
    );
  }
}

export default CompanyForm;
