import React from "react";
import { size } from "lodash";
import { style } from "./style";

const findSelectedItems = selected => {
  const newSelectedItems = [];

  for (let key in selected) {
    if (
      selected[key].status === "true" &&
      !selected[key].hasOwnProperty("child")
    ) {
      newSelectedItems.push({
        id: key,
        ...selected[key]
      });
    }
  }
  return newSelectedItems;
};

class TagInput extends React.Component {
  state = {
    items: [],
    focused: false,
    input: ""
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    const newSelectedItems = findSelectedItems(this.props.selected);
    if (
      this.props.selected &&
      size(newSelectedItems) !== size(this.state.items)
    ) {
      this.setState({
        items: newSelectedItems
      });
    }
  }

  render() {
    return (
      <label>
        <ul style={style.dropdownSelectedUl}>
          {this.state.items.map((item, i) => (
            <li
              key={i}
              style={style.dropdownItems}
              onClick={this.handleRemoveItem(item)}
            >
              {item.title}
              <span>(x)</span>
            </li>
          ))}
          <input
            style={style.dropdownInput}
            value={this.state.input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
          />
        </ul>
      </label>
    );
  }

  handleInputChange = evt => {
    this.setState({ input: evt.target.value });
    this.props.onChange(evt);
  };

  handleRemoveItem = item => {
    return () => {
      this.props.onItemRemove(item);
    };
  };
}

export default TagInput;
