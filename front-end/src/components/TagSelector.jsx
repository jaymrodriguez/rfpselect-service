import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import PropTypes from 'prop-types';

class TagSelector extends React.Component {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    suggestions: PropTypes.array.isRequired,
  };
  state = {
    tags: [],
    suggestions: [],
  };
  handleDelete = (i) => {
    const tags = this.state.tags.slice(0); // get local copy;
    tags.splice(i, 1);
    this.setState({ tags });
  };
  handleAddition = (tag) => {
    const tags = [].concat(this.state.tag, tag);
    this.setState({ tags });
  };
  render() {
    const { tags, suggestions } = this.state;

    return (
      <ReactTags
        tag={tags}
        suggestions={suggestions}
        handleDelete={this.handleDelete}
        handleAddition={this.handleAddition}
      />
    );
  }
}

export default TagSelector;
