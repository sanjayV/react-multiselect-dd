import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';
import _ from "lodash";
import TagInput from "./TagInput";
import { createTree } from "./createTree";
import { updateChildState, findInTree, updateTreeState } from "./helper";

const Dropdown = styled.div`
    width: 400px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 14px;
    font-family: sans-serif;
    overflow: auto;
    position: relative;

    .dropdown-inner {
        float: left;
        width: 100%;
        border-bottom: 1px solid lightgray;
        box-sizing: border-box;
        padding: 0;
        margin: 0;
        border-radius: 5px 5px 0px 0px;
        background: transparent;

        background-image:linear-gradient(45deg, transparent 50%, gray 50%),
        linear-gradient(135deg, gray 50%, transparent 50%),
        linear-gradient(to right, #ccc, #ccc);
        background-position: calc(100% - 20px) calc(1em + -2px),calc(100% - 15px) calc(1em + -2px),calc(100% - 2.5em) 0.3em;
        background-size: 6px 7px,5px 6px,1px 1.5em;
        background-repeat: no-repeat;
    }
`;

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
                <Dropdown >
                    <div className="dropdown-inner dropdown-button noselect"
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
                        className={`${
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
                </Dropdown>
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
