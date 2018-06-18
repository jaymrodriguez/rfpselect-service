import React from 'react';
import TagSelector from './TagSelector';

class CompanyForm extends React.Component {
  state = {
    tagsxx: [{ id: 1, name: 'Apples' }, { id: 2, name: 'Pears' }],
  };
  render() {
    const tags = [{ id: 1, name: 'Apples' }, { id: 2, name: 'Pears' }];
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

        <label htmlFor="">
          Techs:
          <TagSelector suggestions={tags} />
        </label>
        {/* <input type="text" /> */}
        {/* <label htmlFor="" />
        <input type="text" />
        <label htmlFor="" />
        <input type="text" /> */}
      </form>
    );
  }
}

export default CompanyForm;
