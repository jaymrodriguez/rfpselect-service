import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import PropTypes from 'prop-types';

class TagSelector extends React.Component {
  static propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  };
  state = {
    tagsxxx: [],
  };
  handleDelete = (i) => {
    const tags = this.state.tags.slice(0); // get local copy;
    tags.splice(i, 1);
    this.setState({ tags });
  };
  // handleAddition = (tag) => {
  //   const tags = [].concat(this.state.tags, tag);
  //   this.setState({ tags });
  // };
  render() {
    // const { tags } = this.state;
    const {
      tags, suggestions, handleAddition, parentStateName,
    } = this.props;

    return (
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={this.handleDelete}
        handleAddition={tag => handleAddition(tag, parentStateName)}
        minQueryLength={1}
      />
    );
  }
}

export default TagSelector;
