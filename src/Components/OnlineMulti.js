import React, { Component } from "react";
import {
  ReactiveBase,
  MultiDropdownList,
  ReactiveList,
  SelectedFilters,
} from "@appbaseio/reactivesearch";

class OnlineMulti extends Component {
  constructor(props) {
    super(props);

    this.handleCustomQuery = this.handleCustomQuery.bind(this);
  }
  handleCustomQuery (value) {
    var choice = JSON.stringify(value);
    if (value && value.length) {
      switch (true) {
        case choice === JSON.stringify(["KW Web"]):
          return {
            query: {
              match: {
                ShowOnKwiatcom: "1",
              },
            },
          };
        case choice === JSON.stringify(["FL Web"]):
          return {
            query: {
              match: {
                ShowonFLcom: "1",
              },
            },
          };
        case choice === JSON.stringify(["3rd Part Feeds"]):
          return {
            query: {
              bool: {
                must: {
                  exists: {
                    field: "Feeds",
                  },
                },
              },
            },
          };
        case choice === JSON.stringify(["KW Web", "FL Web"]) ||
          choice === JSON.stringify(["FL Web", "KW Web"]):
          return {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      ShowOnKwiatcom: "1",
                    },
                  },
                  {
                    term: {
                      ShowonFLcom: "1",
                    },
                  },
                ],
              },
            },
          };
        case choice === JSON.stringify(["KW Web", "3rd Part Feeds"]) ||
          choice === JSON.stringify(["3rd Part Feeds", "KW Web"]):
          return {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      ShowOnKwiatcom: "1",
                    },
                  },
                  {
                    exists: {
                      field: "Feeds",
                    },
                  },
                ],
              },
            },
          };
        case choice === JSON.stringify(["FL Web", "3rd Part Feeds"]) ||
          choice === JSON.stringify(["3rd Part Feeds", "FL Web"]):
          return {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      ShowonFLcom: "1",
                    },
                  },
                  {
                    exists: {
                      field: "Feeds",
                    },
                  },
                ],
              },
            },
          };
        case value.length === 3:
          return {
            query: {
              bool: {
                must: [
                  {
                    term: {
                      ShowOnKwiatcom: "1",
                    },
                  },
                  {
                    term: {
                      ShowonFLcom: "1",
                    },
                  },
                  {
                    exists: {
                      field: "Feeds",
                    },
                  },
                ],
              },
            },
          };
        default:
          break;
      }
    }
    return;
  }

  render() {
    return (
      <ReactiveBase
        // app="good-books-ds"
        // credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
        app="kwfl-acumatica-catalog-v7-prod-jewelrystyle2"
        url="https://es-cluster-kwfl-acumatica-catalog-v7-536qcv.searchbase.io/"
        credentials="sskkHhrv2:855c6e07-7967-4c5b-bf9b-0f9dfd1acaab"
      >
        <div className="row">
          <div className="col">
            <MultiDropdownList
              componentId="BookSensor"
              dataField="ShowOnKwiatcom.keyword"
              size={100}
              transformData={() => {
                var customLabels = [
                  { key: "KW Web" },
                  { key: "FL Web" },
                  { key: "3rd Part Feeds" },
                ];
                return customLabels;
              }}
              customQuery={this.handleCustomQuery}
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
                or: ["BookSensor"],
              }}
              defaultQuery={function () {
                return {
                  track_total_hits: true
                };
              }}
            />
          </div>
        </div>
      </ReactiveBase>
    );
  }

  booksReactiveList(data) {
    return (
      <div className="flex book-content" key={data._id}>
        <div className="flex column justify-center" style={{ marginLeft: 20 }}>
          <div className="book-header">{data.StyleNumber}</div>
        </div>
      </div>
    );
  }
}

export default OnlineMulti;
