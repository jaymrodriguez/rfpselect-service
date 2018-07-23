import React from 'react';
import { ReactiveBase, DataSearch, ResultCard, MultiDropdownList } from '@appbaseio/reactivesearch';

const Search = () => {
  const sugggestions = [
    { label: 'Intellisys', value: 'Intellisys' },
    { label: 'PHP', value: 'PHP' },
    { label: 'Content Management System', value: 'CMS' },
    { label: 'JavaScript', value: 'JavaScript' },
  ];
  return (
    <ReactiveBase app="rfpindex" url="http://localhost:9200">
      <DataSearch
        componentId="searchbox"
        dataField="content_searchable"
        onSuggestion={suggestion => ({
          label: <div>{suggestion._source.title}</div>,
          value: suggestion._source.title,
        })}
        placeholder="Serch for Companies"
        defaultSuggestions={sugggestions}
      />
      <MultiDropdownList
        componentId="resourcing_filter"
        dataField="resourcing_str"
        title="Resourcing"
        showSearch={false}
        react={{ and: ['searchbox'] }}
      />
      <MultiDropdownList
        componentId="technology_filter"
        dataField="technologies_str"
        title="Technologies"
        showSearch={false}
        react={{ and: ['searchbox'] }}
      />
      <MultiDropdownList
        componentId="categories_filter"
        dataField="categories_str"
        title="Categories"
        showSearch={false}
        react={{ and: ['searchbox'] }}
      />
      <ResultCard
        componentId="result"
        title="Results"
        dataField="content_searchable"
        from={0}
        size={8}
        pagination
        react={{
          and: ['searchbox', 'resourcing_filter', 'categories_str'],
        }}
        onData={res => ({
          image: 'https://bit.do/demoimg',
          title: res.title,
          description: res.description_str,
          url: `company/${res.id}`,
        })}
        defaultQuery={() => ({
          match: {
            type: 'company',
          },
        })}
      />
    </ReactiveBase>
  );
};

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
