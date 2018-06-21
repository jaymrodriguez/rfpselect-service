import React from 'react';
import ReactTags from 'react-tag-autocomplete';
import PropTypes from 'prop-types';

const TagSelector = ({
  tags, suggestions, handleAddition, parentStateName, handleDelete,
}) => (
  <ReactTags
    tags={tags}
    suggestions={suggestions}
    handleDelete={index => handleDelete(index, parentStateName)}
    handleAddition={tag => handleAddition(tag, parentStateName)}
    minQueryLength={1}
  />
);

TagSelector.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleAddition: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  parentStateName: PropTypes.string.isRequired,
};

export default TagSelector;
