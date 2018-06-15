import React from 'react';
import ReactTags from 'react-tag-autocomplete';

class CompanyForm extends React.Component {
  state = {
    tags: [{ id: 1, name: 'Apples' }, { id: 2, name: 'Pears' }],
  };
  render() {
    return (
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" />
        <label htmlFor="url">URL:</label>
        <input type="url" name="url" />
        <label htmlFor="founding-date">Founding Date</label>
        <input type="date" name="founding-date" />
        <label htmlFor="size-organization">Size Of Organization</label>
        <input type="number" name="size-organization" />
        <label htmlFor="description">Description:</label>
        <textarea name="description" rows="10" cols="30" />
        <label htmlFor="" />
        <ReactTags tags={this.state.tags} />
        {/* <input type="text" /> */}
        <label htmlFor="" />
        <input type="text" />
        <label htmlFor="" />
        <input type="text" />
      </form>
    );
  }
}

export default CompanyForm;
