import React from "react";
import SelectUi from "./style/Select";

class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attributes: { indeterminate: 'false' }
        };
    }

    componentDidMount() {
        // this.refs.box.indeterminate = this.props.indeterminate;
        if (this.props.indeterminate) {
            this.setState({
                attributes: { indeterminate: this.props.indeterminate }
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.indeterminate !== this.props.indeterminate) {
            //this.refs.box.indeterminate = this.props.indeterminate;
            if (this.props.indeterminate) {
                this.setState({
                    attributes: { indeterminate: this.props.indeterminate }
                });
            } else {
                this.setState({
                    attributes: { indeterminate: 'false' }
                });
            }
        }
    }

    render() {
        return (
            <SelectUi checkedColor={this.props.checkedColor}>
                <p>{this.props.label}</p>
                <input
                    {...this.props}
                    {...this.state.attributes}
                    type="checkbox" />
                <span />
            </SelectUi>
        );
    }
}

export default Select;
