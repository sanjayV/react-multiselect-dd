import React from "react";
import Container from "./style/Checkbox.style";

class IndeterminateCheckbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attributes: ''
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
            }
        }
    }

    render() {
        return (
            <Container>
                <p>{this.props.label}</p>
                <input
                    {...this.props}
                    {...this.state.attributes}
                    type="checkbox" />
                <span />
            </Container>
        );
    }
}

export default IndeterminateCheckbox;
