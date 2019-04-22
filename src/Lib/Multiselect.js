import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
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
  margin-left: 10px;

  .dropdown-inner {
    max-height: 40px;
    overflow: hidden;
    float: left;
    width: 100%;
    border-bottom: 1px solid lightgray;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    border-radius: 5px 5px 0px 0px;
    background: transparent;

    background-image: linear-gradient(45deg, transparent 50%, gray 50%),
      linear-gradient(135deg, gray 50%, transparent 50%),
      linear-gradient(to right, #ccc, #ccc);
    background-position: calc(100% - 20px) calc(1em + -2px),
      calc(100% - 15px) calc(1em + -2px), calc(100% - 2.5em) 0.3em;
    background-size: 6px 7px, 5px 6px, 1px 1.5em;
    background-repeat: no-repeat;
  }
`;

class Multiselect extends React.Component {
  state = {
    isDropdownOpen: false,
    search: "",
    selectedState: {}
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef = node => {
    this.wrapperRef = node;
  };

  handleClickOutside = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.toggleDropdown(false);
    }
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

    this.setState(
      {
        selectedState: newSelectedState
      },
      () => {
        this.props.onChange(this.state.selectedState);
      }
    );
  };

  onChange = (e, d) => {
    const { checked } = e.target;
    this.reCreateTreeState(checked, d);
  };

  toggleDropdown = status => {
    this.setState(({ isDropdownOpen }) => {
      return {
        isDropdownOpen: status || !isDropdownOpen
      };
    });
  };

  render() {
    const { search, selectedState } = this.state;
    const { data } = this.props;
    return (
      <React.Fragment>
        <div className="instructions">
          (Click to expand and select states to filter)
        </div>
        <Dropdown ref={this.setWrapperRef}>
          <div className="dropdown-inner dropdown-button noselect">
            <TagInput
              onChange={e => this.setState({ search: e.target.value })}
              selected={this.state.selectedState}
              onItemRemove={({ status, ...item }) =>
                this.reCreateTreeState(false, item)
              }
              toggleDropdown={this.toggleDropdown}
              maxLimitOfSelectedItems={this.props.maxLimitOfSelectedItems}
            />
            <i
              onClick={() => this.toggleDropdown(false)}
              className="fa fa-filter"
            />
          </div>
          <div className={`${this.state.isDropdownOpen ? "show" : "hide"}`}>
            {createTree(data, search, selectedState, this.onChange)}
          </div>
        </Dropdown>
      </React.Fragment>
    );
  }
}

Multiselect.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  maxLimitOfSelectedItems: PropTypes.number
};

Multiselect.defaultProps = {
  data: [],
  onChange: () => {},
  maxLimitOfSelectedItems: 3
};

export default Multiselect;
