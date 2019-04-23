import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import Dropdown from "./Multiselect.style";
import TagInput from "./TagInput";
import { createTree } from "./createTree";
import { updateChildState, findInTree, updateTreeState } from "./helper";

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
    this.setState({ isDropdownOpen: status });
  };

  render() {
    const { search, selectedState } = this.state;
    const { data } = this.props;
    return (
      <React.Fragment>
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
            <i className="fa fa-filter" />
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
  maxLimitOfSelectedItems: 2
};

export default Multiselect;
