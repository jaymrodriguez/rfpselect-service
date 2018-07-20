import React from 'react';
import { ReactiveBase, DataSearch, ResultCard } from '@appbaseio/reactivesearch';

class Search extends React.Component {
  state = {};
  render = () => (
    <ReactiveBase app="rfpindex" url="http://localhost:9200">
      <DataSearch
        componentId="searchbox"
        dataField="content_searchable"
        onSuggestion={suggestion => ({
          label: <div>{suggestion._source.title}</div>,
          value: suggestion._source.title,
        })}
        placeholder="Serch for Companies"
      />
      <ResultCard
        componentId="result"
        title="Results"
        dataField="content_searchable"
        from={0}
        size={5}
        pagination
        react={{
          and: ['searchbox'],
        }}
        onData={res => ({
          image: 'https://bit.do/demoimg',
          title: res.title,
          description: res.description_str,
        })}
      />
    </ReactiveBase>
  );
}

export default Search;

// curl -X PUT "localhost:9200/rfpindex/_mapping/wpsolr_types" -H 'Content-Type: application/json' -d'
// {
//   "properties": {
//     "content_searchable": {
//       "type": "text",
//       "copy_to": [
//         "text",
//         "spell",
//         "autocomplete"
//       ]
//     },
//     "categories_str": {
//       "type": "keyword",
//       "copy_to": "content_searchable"
//     },
//     "technologies_str": {
//       "type": "keyword",
//       "copy_to": "content_searchable"
//     },
//     "name_str": {
//       "type": "keyword",
//       "copy_to": "content_searchable"
//     }
//   }
// }'
