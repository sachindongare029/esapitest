import React, { Component } from "react";
import ReactDragListView from "react-drag-listview";

class DragAndDrop extends Component {
  constructor(props) {
    super(props);

    const data = [];
    for (let i = 1, len = 7; i < len; i++) {
      data.push({
        title: `rows${i}`,
      });
    }

    this.state = {
      data,
    };
  }

  render() {
    const that = this;
    const dragProps = {
      onDragEnd(fromIndex, toIndex) {
        const data = that.state.data;
        const item = data.splice(fromIndex, 1)[0];
        data.splice(toIndex, 0, item);
        that.setState({ data });
      },
      nodeSelector: ".drag__selector",
      handleSelector: ".drag__class",
    };

    return (
      <ReactDragListView {...dragProps}>
        <ol>
          {this.state.data.map((item, index) => (
            <li key={index} className="drag__selector">
              {item.title}
              <span className="drag__class">Drag</span>
            </li>
          ))}
        </ol>
      </ReactDragListView>
    );
  }
}

export default DragAndDrop;
