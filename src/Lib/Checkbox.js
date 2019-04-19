const React = require("react");

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
      <label className="container">
        <p>{this.props.label}</p>
        <input {...this.props} ref="box" type="checkbox" />
        <span className="checkmark" />
      </label>
    );
  }
}

export default IndeterminateCheckbox;
