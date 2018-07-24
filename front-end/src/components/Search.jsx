/* eslint no-underscore-dangle: ["error", { "allow": ["_source"] }] */

import React from 'react';
import moment from 'moment';
import {
  ReactiveBase,
  DataSearch,
  ResultCard,
  MultiDropdownList,
  SingleDropdownRange,
} from '@appbaseio/reactivesearch';

const sugggestions = [
  { label: 'Intellisys', value: 'Intellisys' },
  { label: 'PHP', value: 'PHP' },
  { label: 'Content Management System', value: 'CMS' },
  { label: 'JavaScript', value: 'JavaScript' },
];
const dateFilterValues = [
  { start: 150, end: 0, label: 'Any' },
  { start: 150, end: 1, label: '>1' },
  { start: 3, end: 2, label: '2 - 3' },
  { start: 5, end: 4, label: '4 - 5' },
  { start: 150, end: 6, label: '5+' },
];
const sizeFilterValues = [
  { start: 0, end: 10 ** 8, label: 'Any' },
  { start: 1, end: 10, label: '1 - 10' },
  { start: 11, end: 50, label: '11 - 50' },
  { start: 51, end: 99, label: '51 -99' },
  { start: 100, end: 10 ** 8, label: '100+' },
  { start: 500, end: 10 ** 8, label: '500+' },
];
const yearsQuery = dateRange => ({
  query: {
    range: {
      founding_date_dt: {
        gte: moment()
          .subtract(dateRange.start, 'years')
          .format('YYYY-MM-DD'),
        lte: moment()
          .subtract(dateRange.end, 'years')
          .format('YYYY-MM-DD'),
      },
    },
  },
});
const Search = () => (
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
    <SingleDropdownRange
      componentId="date_filter"
      title="Years in business"
      dataField="founding_date_dt"
      data={dateFilterValues}
      customQuery={yearsQuery}
    />
    <SingleDropdownRange
      componentId="size_filter"
      title="Size Of Organization"
      dataField="size_of_organization_i"
      react={{ and: ['searchbox'] }}
      data={sizeFilterValues}
    />
    <ResultCard
      componentId="result"
      title="Results"
      dataField="content_searchable"
      from={0}
      size={8}
      pagination
      react={{
        and: ['searchbox', 'resourcing_filter', 'categories_filter', 'date_filter', 'size_filter'],
      }}
      onData={res => ({
        image: 'https://bit.do/demoimg',
        title: res.title,
        description: res.description,
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

export default Search;
