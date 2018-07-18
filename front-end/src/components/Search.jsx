import React from 'react';
import { ReactiveBase, CategorySearch } from '@appbaseio/reactivesearch';

class Search extends React.Component {
  state = {};
  render = () => (
    <ReactiveBase app="rfpindex" url="http://localhost:9200">
      <CategorySearch
        componentId="searchbox"
        dataField={['name_str', 'technologies_str']}
        categoryField="title"
        placeholder="Search Companies"
      />
    </ReactiveBase>
  );
}

export default Search;
