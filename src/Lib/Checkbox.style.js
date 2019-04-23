import styled from "styled-components";

export default styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;

    &:checked ~ span {
      background-color: #e6783b;
      border-color: #e6783b;

      &:after {
        display: block;
      }
    }
  }

  input[indeterminate] ~ span {
    background-color: #e6783b;
    content: "-";

    &:after {
      left: 9px;
      top: 5px;
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
    height: 25px;
    width: 25px;
    border: 1px solid rgb(171, 171, 170);
    border-radius: 4px;

    &:after {
      content: "";
      position: absolute;
      display: none;

      left: 9px;
      top: 5px;
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
