import styled from "styled-components";

export default styled.label`
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 10px;
  cursor: pointer;

  p {
    margin-bottom: .5em;
    margin-top: 0.5em;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: ${props => props.checkedColor || "#e6783b"};
      border-color: ${props => props.checkedColor || "#e6783b"};

      &:after {
        display: block;
      }
    }
  }

  input[indeterminate='true'] ~ span {
    background-color: ${props => props.checkedColor || "#e6783b"};
    content: "-";

    &:after {
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 0 0;
      -webkit-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
      display: block;
    }
  }

  span {
    position: absolute;
    top: 0px;
    left: 0px;
    height: 20px;
    width: 20px;
    border: 1px solid rgb(171, 171, 170);
    border-radius: 4px;

    &:after {
      content: "";
      position: absolute;
      display: none;

      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  }
`;
