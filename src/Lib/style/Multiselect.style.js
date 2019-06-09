import styled from "styled-components";

export default styled.div`
  width: 360px;
  border: 1px solid lightgray;
  border-radius: 5px;
  font-size: 14px;
  font-family: sans-serif;
  overflow: auto;
  position: relative;
  margin-left: 10px;

  .dropdown-inner {
    min-height: 41px;
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
