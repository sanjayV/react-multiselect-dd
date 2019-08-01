import styled from "styled-components";

export default styled.ul`
  overflow-y: auto;
  overflow-x: auto;
  margin: 0;
  padding-left: 30px;
  height: ${props => props.height + "px" || "auto"};

  li {
    list-style: none;
  }
`;
