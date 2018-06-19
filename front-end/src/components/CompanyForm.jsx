import React from 'react';
import TagSelector from './TagSelector';
import { getResourcing, getCategories, getTechnologies } from '../services/TaxonomyService';

class CompanyForm extends React.Component {
  state = {
    resources: [],
    categories: [],
    technologies: [],
  };
  async componentDidMount() {
    getResourcing().then(resources => this.setState({ resources }));
    getCategories().then(categories => this.setState({ categories }));
    getTechnologies().then(technologies => this.setState({ technologies }));
  }
  render() {
    // const tags = [{ id: 1, name: 'Apples' }, { id: 2, name: 'Pears' }];
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
