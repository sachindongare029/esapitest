import React, { Component } from 'react';
import {
  ReactiveBase,
  SelectedFilters,
  DataSearch,
  ReactiveList
} from "@appbaseio/reactivesearch";

class Datasearch extends Component {
  render() {
    return (
      <ReactiveBase
        // app="good-books-ds"
        // credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
        app="kwfl-acumatica-catalog-v7-prod-diamondserial2"
        url="https://es-cluster-kwfl-acumatica-catalog-v7-536qcv.searchbase.io/"
        credentials="sskkHhrv2:855c6e07-7967-4c5b-bf9b-0f9dfd1acaab"
      >
        <div className="row">
          <div className="col">
            {/* <DataSearch
              title="DataSearch"
              dataField={["SerialNumber", "SerialNumber.search"]}
              componentId="demo"
            /> */}
            <DataSearch
              componentId="demo"
              dataField={["LabReportNbr"]}
              title="Search"
              placeholder="Search for cities or venues"
              autosuggest={true}
              highlightField="LabReportNbr"
              queryFormat="and"
              debounce={100}
              showFilter={true}
              filterLabel="serial search"
              URLParams={false}
            />
          </div>

          <div className="col">
            <SelectedFilters />
            <ReactiveList
              componentId="SearchResult"
              dataField="original_title.raw"
              className="result-list-container"
              from={0}
              size={10}
              pagination={true}
              renderItem={this.booksReactiveList}
              react={{
                and: ["demo"]
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }

  booksReactiveList(data) {
    console.log(data);
    return (
      <div className="flex book-content" key={data._id}>
        <div className="flex column justify-center" style={{ marginLeft: 20 }}>
          <div className="book-header">{data.LabReportNbr}</div>
        </div>
      </div>
    );
  }
}

export default Datasearch;
