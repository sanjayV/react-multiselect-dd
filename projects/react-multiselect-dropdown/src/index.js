import React from "react";
import PropTypes from "prop-types";
import Dropdown from "./style/Multiselect.style";
import TagInput from "./TagInput";
import { CheckboxTree } from "./CheckboxTree";
import { updateChildState, findInTree, updateTreeState } from "./helper";

class Multiselect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isDropdownOpen: false,
            search: "",
            selectedState: {}
        };
    }

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
        if (this.wrapperRef) {
            this.toggleDropdown(!!this.wrapperRef.contains(e.target) && e.target.className !== 'dropdown-button-arrow pointer active');
        }
    };

    reCreateTreeState = (checked, d) => {
        const { selectedState } = this.state;
        const { data, grouped } = this.props;

        selectedState[parseInt(d.id)] = {
            status: checked.toString(),
            ...d
        };
        let newSelectedState = selectedState;

        if (grouped) {
            const searchPath = data.reduce((acc, child) => {
                const findResult = findInTree(parseInt(d.id), child);
                if (findResult && typeof findResult == 'object' && Object.keys(findResult).length) {
                    return findResult;
                }
                return acc;
            }, undefined);

            if (searchPath && searchPath.path && searchPath.path instanceof Array) {
                searchPath.path.pop();
            }

            let updatedSelectedState = selectedState;
            if (d.child) {
                updatedSelectedState = updateChildState(
                    selectedState,
                    d.child,
                    checked.toString()
                );
            }

            newSelectedState = searchPath
                ? updateTreeState(searchPath, updatedSelectedState)
                : updatedSelectedState;
        }

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
        const { search, selectedState, isDropdownOpen } = this.state;
        const { data, grouped, maxLimitOfSelectedItems } = this.props;

        const filteredSelected = Object.entries(selectedState)
            .filter(
            ([key, val]) =>
                (!grouped && val.status === "true") ||
                (grouped && val.status === "true" && !val.hasOwnProperty("child"))
            )
            .reduce((arr, [key, val]) => [...arr, { id: key, ...val }], []);
        return (
            <React.Fragment>
                <Dropdown ref={this.setWrapperRef}>
                    <div className="dropdown-inner dropdown-button noselect pointer">
                        <TagInput
                            onChange={e => this.setState({ search: e.target.value })}
                            selected={filteredSelected}
                            onItemRemove={({ status, ...item }) =>
                                this.reCreateTreeState(false, item)
                            }
                            maxLimitOfSelectedItems={maxLimitOfSelectedItems}
                        />
                    </div>
                    <div className={`dropdown-button-arrow pointer ${isDropdownOpen ? "active" : ""}`}></div>
                    {isDropdownOpen &&
                        <CheckboxTree
                            data={data}
                            search={search}
                            selected={selectedState}
                            onChange={this.onChange}
                        />
                    }
                </Dropdown>
            </React.Fragment>
        );
    }
}

Multiselect.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    maxLimitOfSelectedItems: PropTypes.number,
    grouped: PropTypes.bool
};

Multiselect.defaultProps = {
    data: [],
    onChange: () => { },
    maxLimitOfSelectedItems: 2,
    grouped: true
};

export default Multiselect;
