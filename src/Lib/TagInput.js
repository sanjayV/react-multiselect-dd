import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { size } from "lodash";

const CustomInput = styled.label`
    ul {
        padding: 0px;
        margin: 5px;

        li {
            display: inline-block;
            padding: 4px 6px;
            font-family: Helvetica; sans-serif;
            border-radius: 5px;
            margin: 0px 4px 4px 0px;
            cursor: pointer;
            background-color: #e4e7ea;
            border: 1px solid #d2d6dc;

            span {
                margin-left: 10px;
                font-weight: 1000;
                position: relative;
                top: 2px;
            }
        }

        input {
            outline: none;
            border: none;
            font-size: 14px;
            font-family: Helvetica, sans-serif;
        }
    }
`;

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
    const { items, input } = this.state;
    const { maxLimitOfSelectedItems } = this.props;
    const itemsLength = items.length;
    const MAX_NUMBER_OF_ELEMENTS =
      itemsLength > maxLimitOfSelectedItems
        ? maxLimitOfSelectedItems
        : itemsLength;
    return (
      <CustomInput>
        <ul>
          {items.slice(0, MAX_NUMBER_OF_ELEMENTS).map((item, i) => (
            <li key={i} onClick={this.handleRemoveItem(item)}>
              {item.title}
              <span>
                <img
                  alt="Icon"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAECSURBVCiRnZHNTQNBDIU/e/YegfhpAG5EIi1EoaEkym4Jq4SZA1QBJSCxHYCEOPLTACFRckSZGS47GxZxAN7N9rOfnw3/RYxRyrLsfM+XZdmJMUqKNZGttZcmy16stb1UtNb2TJa9njt3kZokTTFZ9gzsAYsYwpmqSoQbYBeY+83mqCiKVSM1nU5PRfW2Jizr9A6wUJH+aDR6aBQSnHNdH0JVKwHMjWp/OBw+tjwkeO8jEJpDgP/4ErcanHNdoAIO6pWWAocmhGo2m50k3ta0MU+I7P9oOsY37/1xURQrBcjzfC0i18C7igwmk8n9eDy+U5EBsED1Ks/zdetBv33cn/EJBQJxcfY0zVIAAAAASUVORK5CYII="
                />
              </span>
            </li>
          ))}
          {itemsLength > MAX_NUMBER_OF_ELEMENTS && <li key="...">...</li>}
          <input
            onFocus={() => {
              this.props.toggleDropdown(true);
            }}
            value={input}
            onChange={this.handleInputChange}
            onKeyDown={this.handleInputKeyDown}
          />
        </ul>
      </CustomInput>
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

TagInput.propTypes = {
  toggleDropdown: PropTypes.func,
  maxLimitOfSelectedItems: PropTypes.number.isRequired
};

TagInput.defaultProps = {
  toggleDropdown: () => {}
};

export default TagInput;
