import React from "react";
import PropTypes from "prop-types";
import { size } from "lodash";
import MultiselectOptionUi from "./style/MultiselectOption";

class MultiselectOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            focused: false,
            input: ""
        };
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (
            this.props.selected &&
            size(this.props.selected) !== size(this.state.items)
        ) {
            this.setState({
                items: this.props.selected
            });
        }
    }

    render() {
        const { items, input } = this.state;
        const { showSelected } = this.props;
        const itemsLength = items.length;
        const MAX_NUMBER_OF_ELEMENTS =
            itemsLength > showSelected
                ? showSelected
                : itemsLength;
        return (
            <MultiselectOptionUi>
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
                    {itemsLength > MAX_NUMBER_OF_ELEMENTS && (
                        <li key="...">... {itemsLength - MAX_NUMBER_OF_ELEMENTS} more</li>
                    )}
                    <li className="li-input">
                        <input placeholder="Search..."
                            value={input}
                            onChange={this.handleInputChange}
                            onKeyDown={this.handleInputKeyDown}
                        />
                    </li>
                </ul>
            </MultiselectOptionUi>
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

MultiselectOption.propTypes = {
    showSelected: PropTypes.number.isRequired,
    onChange: PropTypes.func
};

MultiselectOption.defaultProps = {
    onChange: () => { }
};

export default MultiselectOption;
