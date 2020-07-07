import React, { Component } from "react";
import Downshift from "downshift";
import axios from "axios";

class Autosuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      inputFocused: false,
    };

    this.fetchMovies = this.fetchMovies.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.onFocused = this.onFocused.bind(this);
    this.outFocused = this.outFocused.bind(this);
  }
  componentDidMount() {
    axios
      .post("https://dev.kwiat.com/KWUpgrade/entity/auth/login", {
        "name": "admin",
        "password": "kwiat",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    // axios.get("https://8b0dda03aac5.ngrok.io/").then(function (response) {
    //   console.log("response", response);
    // });
  }

  onFocused() {
    this.setState({
      inputFocused: true,
    });
  }
  outFocused() {
    this.setState({
      inputFocused: false,
    });
  }

  inputOnChange(event) {
    if (!event.target.value) {
      return;
    }
    this.fetchMovies(event.target.value);
  }

  downshiftOnChange(selectedMovie) {
    console.log(`your favourite movie is ${selectedMovie.title}`);
  }

  fetchMovies(movie) {
    const moviesURL = `https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=${movie}`;
    axios.get(moviesURL).then((response) => {
      this.setState({ movies: response.data.results });
    });
  }

  render() {
    return (
      <Downshift
        onChange={this.downshiftOnChange}
        itemToString={(item) => (item ? item.title : "")}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          getLabelProps,
        }) => (
          <div>
            <label
              style={{ marginTop: "1rem", display: "block" }}
              {...getLabelProps()}
            >
              Choose Customer
            </label>{" "}
            <br />
            <div className="form-group has-feedback">
              <input
                type="text"
                className="form-control"
                id="inputSuccess2"
                {...getInputProps({
                  placeholder: "Search Customer",
                  onChange: this.inputOnChange,
                })}
                onFocus={this.onFocused}
                onBlur={this.outFocused}
              />
              <span className="glyphicon glyphicon-search form-control-feedback"></span>
            </div>
            {isOpen && this.state.inputFocused ? (
              <div className="downshift-dropdown">
                {this.state.movies
                  .filter(
                    (item) =>
                      !inputValue ||
                      item.title
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                  )
                  .slice(0, 10)
                  .map((item, index) => (
                    <div
                      className="dropdown-item"
                      {...getItemProps({ key: index, index, item })}
                      style={{
                        backgroundColor:
                          highlightedIndex === index ? "lightgray" : "white",
                        fontWeight: selectedItem === item ? "bold" : "normal",
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

export default Autosuggest;
