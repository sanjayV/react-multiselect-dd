import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TagInput from "./TagInput";
import { createTree } from "./createTree";
import { updateChildState, findInTree, updateTreeState } from "./helper";
import { style } from "./style";

class Multiselect extends React.Component {
    state = {
        isDropdownOpen: false,
        search: "",
        selectedState: {}
    };

    reCreateTreeState = (checked, d) => {
        const { selectedState } = this.state;
        const { data } = this.props;

        const searchPath = data.reduce((acc, child) => {
            const findResult = findInTree(parseInt(d.id), child);
            if (!_.isEmpty(findResult, true)) {
                return findResult;
            }
            return acc;
        }, undefined);

        if (searchPath && searchPath.path && searchPath.path instanceof Array) {
            searchPath.path.pop();
        }

        selectedState[parseInt(d.id)] = {
            status: checked.toString(),
            ...d
        };

        let updatedSelectedState = selectedState;
        if (d.child) {
            updatedSelectedState = updateChildState(
                selectedState,
                d.child,
                checked.toString()
            );
        }

        const newSelectedState = searchPath
            ? updateTreeState(searchPath, updatedSelectedState)
            : updatedSelectedState;

        this.setState({
            selectedState: newSelectedState
        }, () => {
            this.props.onChange(this.state.selectedState);
        });
    };

    onChange = (e, d) => {
        const { checked } = e.target;
        this.reCreateTreeState(checked, d);
    };

    render() {
        const { search, selectedState } = this.state;
        const { data } = this.props;
        return (
            <React.Fragment>
                <div className="instructions">
                    (Click to expand and select states to filter)
                </div>
                <div className="dropdown-container" style={style.dropdownContainer}>
                    <div style={style.dropdownSelected}
                        className="dropdown-button noselect"
                        onClick={() =>
                            this.setState(({ isDropdownOpen }) => {
                                return {
                                    isDropdownOpen: !isDropdownOpen
                                };
                            })
                        }
                    >
                        <TagInput
                            onChange={e => this.setState({ search: e.target.value })}
                            selected={this.state.selectedState}
                            onItemRemove={({ status, ...item }) =>
                                this.reCreateTreeState(false, item)
                            }
                        />
                        <i className="fa fa-filter" />
                    </div>
                    <div
                        className={`dropdown-list ${
                            this.state.isDropdownOpen ? "show" : "hide"
                            }`}
                    >
                        {createTree(
                            data,
                            search,
                            selectedState,
                            this.onChange
                        )}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

Multiselect.propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func
};

Multiselect.defaultProps = {
    data: [],
    onChange: () => { }
};

export default Multiselect;
