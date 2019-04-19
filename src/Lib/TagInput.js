import React from "react";
import { size } from "lodash";

class TagInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            focused: false,
            input: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        // this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        const newSelectedItems = [];

        for (let key in this.props.selected) {
            if (this.props.selected[key].status === "true") {
                newSelectedItems.push({
                    id: key,
                    ...this.props.selected[key]
                });
            }
        }
        if (
            this.props.selected &&
            size(newSelectedItems) !== size(this.state.items)
        ) {
            const newSelectedItems = [];
            for (let key in this.props.selected) {
                if (this.props.selected[key].status === "true") {
                    newSelectedItems.push({
                        id: key,
                        ...this.props.selected[key]
                    });
                }
            }
            this.setState({
                items: newSelectedItems
            });
        }
    }

    render() {
        const styles = {
            container: {
                border: "1px solid #ddd",
                padding: "5px",
                borderRadius: "5px"
            },

            items: {
                display: "inline-block",
                padding: "2px",
                border: "1px solid blue",
                fontFamily: "Helvetica, sans-serif",
                borderRadius: "5px",
                marginRight: "5px",
                cursor: "pointer"
            },

            input: {
                outline: "none",
                border: "none",
                fontSize: "14px",
                fontFamily: "Helvetica, sans-serif"
            }
        };
        return (
            <label>
                <ul style={styles.container}>
                    {this.state.items.map((item, i) => (
                        <li
                            key={i}
                            style={styles.items}
                            onClick={this.handleRemoveItem(item)}
                        >
                            {item.title}
                            <span>(x)</span>
                        </li>
                    ))}
                    <input
                        style={styles.input}
                        value={this.state.input}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleInputKeyDown}
                    />
                </ul>
            </label>
        );
    }

    handleInputChange(evt) {
        this.setState({ input: evt.target.value });
        this.props.onChange(evt);
    }

    //   handleInputKeyDown(evt) {
    //     if (evt.keyCode === 13) {
    //       const { value } = evt.target;

    //       this.setState(state => ({
    //         items: [...state.items, value],
    //         input: ""
    //       }));
    //     }

    //     if (
    //       this.state.items.length &&
    //       evt.keyCode === 8 &&
    //       !this.state.input.length
    //     ) {
    //       this.setState(state => ({
    //         items: state.items.slice(0, state.items.length - 1)
    //       }));
    //     }
    //   }

    handleRemoveItem(item) {
        return () => {
            this.props.onItemRemove(item);
            //   this.setState(state => {
            //     const items = state.items.filter(({ id }) => id !== item.id);
            //     this.props.onItemRemove(item);
            //     return { items };
            //   });
        };
    }
}

export default TagInput;
