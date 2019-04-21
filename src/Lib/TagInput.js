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
                            <span style={style.dropdownItemsRemove}>
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA3QAAAN0BcFOiBwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAECSURBVCiRnZHNTQNBDIU/e/YegfhpAG5EIi1EoaEkym4Jq4SZA1QBJSCxHYCEOPLTACFRckSZGS47GxZxAN7N9rOfnw3/RYxRyrLsfM+XZdmJMUqKNZGttZcmy16stb1UtNb2TJa9njt3kZokTTFZ9gzsAYsYwpmqSoQbYBeY+83mqCiKVSM1nU5PRfW2Jizr9A6wUJH+aDR6aBQSnHNdH0JVKwHMjWp/OBw+tjwkeO8jEJpDgP/4ErcanHNdoAIO6pWWAocmhGo2m50k3ta0MU+I7P9oOsY37/1xURQrBcjzfC0i18C7igwmk8n9eDy+U5EBsED1Ks/zdetBv33cn/EJBQJxcfY0zVIAAAAASUVORK5CYII=" />
                            </span>
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
