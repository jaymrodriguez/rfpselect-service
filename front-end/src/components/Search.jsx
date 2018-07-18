import React from 'react';
import { ReactiveBase, DataSearch } from '@appbaseio/reactivesearch';

class Search extends React.Component {
  state = {};
  render = () => (
    <ReactiveBase app="rfpindex" url="http://localhost:9200">
      <DataSearch
        componentId="searchbox"
        dataField="title"
        categoryField="title"
        placeholder="Search Companiesxx"
      />
    </ReactiveBase>
  );
}

export default Search;
