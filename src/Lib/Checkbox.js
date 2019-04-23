import React from "react";
import Container from "./style/Checkbox.style";

class IndeterminateCheckbox extends React.Component {
  componentDidMount() {
    this.refs.box.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.refs.box.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    return (
      <Container>
        <p>{this.props.label}</p>
        <input {...this.props} ref="box" type="checkbox" />
        <span />
      </Container>
    );
  }
}

export default IndeterminateCheckbox;
